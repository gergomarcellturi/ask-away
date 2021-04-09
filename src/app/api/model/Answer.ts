import {DocumentReference} from "@angular/fire/firestore";
import {User} from "./user.model";
import firebase from "firebase";

export class Answer {
  answer: string;
  public submitter:  DocumentReference<User>;
  public timestamp: firebase.firestore.FieldValue;
}
