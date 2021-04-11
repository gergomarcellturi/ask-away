import {DocumentReference} from "@angular/fire/firestore";
import {User} from "./user.model";
import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export class Answer {
  answer: string;
  public submitter:  DocumentReference<User>;
  public timestamp: Timestamp;
}
