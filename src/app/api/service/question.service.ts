import {Injectable} from '@angular/core';
import firebase from "firebase";
import {Question} from "../model/Question";
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from "@angular/fire/firestore";
import {AuthService} from "./auth.service";
import {Tag} from "../model/Tag";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Answer} from "../model/Answer";
import {CommonService} from "./common.service";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questionRef: AngularFirestoreCollection<Question>;
  private tagRef: AngularFirestoreCollection<Tag>;

  constructor(
    public auth: AuthService,
    public common: CommonService,
    public firestore: AngularFirestore,
  ) {
    this.questionRef = firestore.collection<Question>('questions');
    this.tagRef = firestore.collection<Tag>('tags');
    this.getTags().then();
  }


  public sendQuestion = ({question, detail, tags}): void => {
    console.log(tags);
    const data = {
      question, detail, tags,
      submitter: this.auth.userRef,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    } as Question

    this.questionRef.add(data).then();
  }

  public sendAnswer = ({uid, answer}): void => {
    const answerRef = this.firestore.collection<Answer>(`questions/${uid}/answers`);
    const data = {
      answer,
      submitter: this.auth.userRef,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    } as Answer;
    answerRef.add(data).then();
  }

  public getTags = async (): Promise<void> => {
    let tagsArray = [];
    this.tagRef.get().subscribe(snapshot => {
      snapshot.docs.forEach(doc => {
        doc.data()
        tagsArray = [...tagsArray, {id: doc.id, ...doc.data()}]
      })
    })
  }

  public getQuestionByUid = (uid: string): void => {
    this.questionRef.doc(uid).get().subscribe(doc => console.log(doc.data()))
  }

  public getRandomQuestions = (limit = 10): Observable<Question[]> => {
    let uidArray = [];
    return this.questionRef.get().pipe(map(snapshot => {
      uidArray = snapshot.docs.map(doc => doc.id);
      snapshot.docs.forEach(doc => console.log(doc.data()))
      if (uidArray.length < limit) return this.getRandomQuestionsByUidsAndSnapshot(uidArray, snapshot);
      else {
        const randomUidArray = this.getRandomUids(limit, uidArray);
        return this.getRandomQuestionsByUidsAndSnapshot(randomUidArray, snapshot);
      }
    }))
  }

  public getTagByName = async (tagName: string): Promise<Tag> => {
    const queryRef = this.tagRef.ref.where('tag', '==', tagName.toLocaleLowerCase())
    return await queryRef.get().then(snapshot => {
      return {
        uid: snapshot?.docs[0]?.id,
        ref: snapshot?.docs[0]?.ref,
        ...snapshot?.docs[0]?.data()
      } as Tag
    })
  }

  public saveTag = (tag: string): Promise<DocumentReference<Tag>> => {
    const data = {
      color: this.common.getDarkColor(),
      tag,
    } as Tag
    return this.tagRef.add(data)
  }


  private getRandomUids = (limit: number, array: string[]): string[] => {
    return array.sort(() => Math.random() - Math.random()).slice(0, limit)
  }

  private getRandomQuestionsByUidsAndSnapshot = (uids: string[], snapshot: firebase.firestore.QuerySnapshot<Question>): Question[] => {
    return snapshot.docs.filter(doc => uids.some(uid => uid === doc.id)).map(doc => Object.assign({}, {uid: doc.id}, doc.data()))
  }
}
