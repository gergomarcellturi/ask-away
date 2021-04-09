import {User} from "./user.model";
import firebase from "firebase";
import {DocumentReference} from "@angular/fire/firestore";
import {Tag} from "./Tag";

export class Question {

  public answer: string;
  public uid: string;

  public question!: string;
  public detail!: string;
  public submitter!:  DocumentReference<User>;
  public timestamp!: firebase.firestore.FieldValue;
  public tags: DocumentReference<Tag>[];
  public tagList: Tag[];
}
