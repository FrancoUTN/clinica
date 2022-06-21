import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth) {
  }
  
  SignUp(email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }
  
  SignIn(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }
  
  SignOut() {
    return this.angularFireAuth.signOut();
  }

  getAuthState() {
    return this.angularFireAuth.authState;
  }

  getUserID() {
    return this.angularFireAuth.authState.pipe(
      take(1),
      map(
        usuario => {
          if (usuario) {
            return usuario.uid
          }
          throw Error('No hay usuario.');
        }
      )
    );
  }

  SendVerificationMail() {
    return this.angularFireAuth.currentUser
      .then((user) => {
        if (user) {
          return user.sendEmailVerification();
        }
        throw "No user";
      });
  }

}
