import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { firebaseAuth } from './firebase';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  login(email: string, password: string) {
    // calls the firebase login function, sends the email and password to check
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(firebaseAuth, email);
  }
}
