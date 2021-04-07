import {User} from "./user.model";
import firebase from "firebase";
import {DocumentReference} from "@angular/fire/firestore";

export class Question {
  question: string;
  detail: string;
  submitter:  DocumentReference<User>;
  timestamp: firebase.firestore.FieldValue;
}
