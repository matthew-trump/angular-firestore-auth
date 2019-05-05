import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { User } from './user'


@Injectable({
  providedIn: "root"
})
export class AuthService {

  user: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.afAuth.authState
      .pipe(
        switchMap(auth => {
          if (auth) {
            return this.afs.collection('users').doc(auth.uid).valueChanges();
          } else {
            return of(null);
          }
        })
      ).subscribe(user => {
        //console.log("NEXT USER",user);
        this.user.next(user);
      });
  }
  public getAuth() {
    return this.afAuth.auth;
  }

  public googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider)
      .then(credential => {
        this.updateUser(credential.user);
      })
  }
  public signOut() {
    this.afAuth.auth.signOut();
  }
  public updateUser(authData) {
    const userData = new User(authData);
    const ref = this.afs.collection('users').doc(authData.uid);
    ref.valueChanges().subscribe(user => {
      if (!user) {
        //console.log('UPDATING USER',user,authData.uid,userData);
        ref.set({
          email: userData.email,
          photoURL: userData.photoURL,
          roles: userData.roles
        });
      } else {
        //console.log('GOT USER',user,authData.uid,userData);
      }

    });
  }
}
