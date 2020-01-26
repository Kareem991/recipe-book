import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  constructor() { }

signupUser(email: string, password: string) {
firebase.auth().createUserWithEmailAndPassword(email, password).catch(
  error => console.log(error)
);
}
signinUser(email: string, password: string) {
 return firebase.auth().signInWithEmailAndPassword(email, password).then(response => {
      firebase.auth().currentUser.getIdToken().then(
        token => this.token = token
      );
    }
  );

}
getToken() {
  firebase.auth().currentUser.getIdToken().then(
    token => this.token = token
  );
  return this.token;
}
isAuthenticated() {
  return this.token != null;
}
logout() {
return firebase.auth().signOut().then(response => {
  this.token = null;
});
}
}
