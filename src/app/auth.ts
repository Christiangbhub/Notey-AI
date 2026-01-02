import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  GoogleAuthProvider,
  signInWithPopup,
  User,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from '../app/firebase';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {}
