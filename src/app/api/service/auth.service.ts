import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {User} from "../model/user.model";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import firebase from "firebase";
import auth = firebase.auth;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<User>;

  constructor(
    private fireStore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.user$ = fireAuth.authState.pipe(
      switchMap(user => {
        if (user) return this.fireStore.doc<User>(`users/${user.uid}`).valueChanges();
        else return of(null);
      })
    )
  }


  public googleSignIn = async (): Promise<void> => {
    const provider = new auth.GoogleAuthProvider();
    return this.signIn(provider);
  }

  public facebookSignIn = async (): Promise<void> => {
    const provider = new auth.FacebookAuthProvider();
    return this.signIn(provider);
  }

  private signIn = async (provider: auth.AuthProvider): Promise<void> => {
    const credentials = await this.fireAuth.signInWithPopup(provider);
    return this.updateUserData(credentials.user);
  }

  public signOut = async (): Promise<boolean> => {
    await this.fireAuth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(`users/${user.uid}`);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    return userRef.set(userData, {merge: true});
  }
}
