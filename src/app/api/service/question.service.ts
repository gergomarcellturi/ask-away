import { Injectable } from '@angular/core';
import firebase from "firebase";
import {Question} from "../model/Question";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questionRef:  AngularFirestoreCollection<Question>;

  constructor(
    public auth: AuthService,
    public firestore: AngularFirestore,
  ) {
    this.questionRef = firestore.collection<Question>('questions');
  }


  public sendQuestion = ({question, detail}): void => {
    const data = {
      question, detail,
      submitter: this.auth.userRef,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    } as Question

    this.questionRef.add(data).then();
  }

}
