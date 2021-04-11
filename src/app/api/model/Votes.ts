import {DocumentReference} from "@angular/fire/firestore";
import {User} from "./user.model";

export class Vote {
  vote: number;
  voter: DocumentReference<User>;
}
