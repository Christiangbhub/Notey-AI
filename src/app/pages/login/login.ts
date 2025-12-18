import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgModel } from '@angular/forms';
import { MatAnchor } from "@angular/material/button";
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatAnchor, MatButtonModule, MatIcon, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  password: string = '';
  hide: boolean = true;

  constructor(private router: Router) { }

  onLogin() {
    // Handle login logic here
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then(() => {
        // alert('Login successful!');
        setTimeout(() => {
          this.router.navigate(['/notes']);
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
        alert('Login failed: ' + err.message);
      });
  }

  onCreateUser() {
    this.router.navigate(['/newUser']);
  }

}
