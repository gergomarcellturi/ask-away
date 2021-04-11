import {User} from "./user.model";
import firebase from "firebase";
import {DocumentReference} from "@angular/fire/firestore";
import {Tag} from "./Tag";
import Timestamp = firebase.firestore.Timestamp;
import {Observable} from "rxjs";
import {Vote} from "./Votes";
import {Answer} from "./Answer";

export class Question {

  public answer: string;
  public uid: string;

  public question!: string;
  public detail!: string;
  public submitter!:  DocumentReference<User>;
  public timestamp!: Timestamp;
  public tags: DocumentReference<Tag>[];
  public tagList: Tag[];
  public votes: Observable<Vote[]>;
  public answers: Promise<Answer[]>;
}
