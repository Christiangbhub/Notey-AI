import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgModel } from '@angular/forms';
import { MatAnchor } from "@angular/material/button";
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { Auth } from 'firebase/auth';
import { auth } from '../../firebase';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
@Component({
  selector: 'app-user',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatAnchor, MatButtonModule, MatIcon, CommonModule, RouterModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  email: string = '';
  password: string = '';
  hide: boolean = true;

  constructor(private router: Router) { }

  /**
  * Creates a new user account with the provided email and password.
  * Automatically signs the user in upon successful creation.
  * @param email The user's email address.
  * @param password The user's desired password.
  * @returns A Promise that resolves with the user credentials.
  */
  async signUp(email: string, password: string): Promise<any> {
    try {


      if (!email && !password) {
        alert('Email and Password are required.');
        return;
      } else if (!email) {
        alert('Email is required.');
        return;
      } else if (!password) {
        alert('Password is required.');
        return;
      }

      else if (password.length < 6) {
        alert('Password should be at least 6 characters long.');
        return;
      }

      // 1. Call the Firebase Auth method
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // 2. The new user is now created in Firebase Authentication
      // and is automatically signed in.
      console.log('User created and signed in:', userCredential.user);
      alert('User account created successfully!');

      // You can return the user info or handle additional profile updates here
      this.router.navigate(['/notes']);

      return userCredential;

    } catch (error) {
      // 3. Handle specific errors (e.g., weak password, email already in use)
      console.error('Error signing up:', error);
      throw error; // Re-throw the error to be handled by the calling component
    }
  }
}





