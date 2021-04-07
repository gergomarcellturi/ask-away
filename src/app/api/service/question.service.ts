import { Injectable } from '@angular/core';
import firebase from "firebase";
import {Question} from "../model/Question";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {AuthService} from "./auth.service";
import {Tag} from "../model/Tag";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questionRef:  AngularFirestoreCollection<Question>;
  private tagRef: AngularFirestoreCollection<Tag>;

  constructor(
    public auth: AuthService,
    public firestore: AngularFirestore,
  ) {
    this.questionRef = firestore.collection<Question>('questions');
    this.tagRef = firestore.collection<Tag>('tags');
    this.getTags().then();
  }


  public sendQuestion = ({question, detail}): void => {
    const data = {
      question, detail,
      submitter: this.auth.userRef,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    } as Question

    this.questionRef.add(data).then();
  }

  public getTags = async (): Promise<void> => {
    let tagsArray = [];
    this.tagRef.get().subscribe(snapshot => {
      snapshot.docs.forEach(doc => {
        doc.data()
        tagsArray = [...tagsArray, {id: doc.id, ...doc.data()}]
      })
      console.log(tagsArray);
    })

  }

}
