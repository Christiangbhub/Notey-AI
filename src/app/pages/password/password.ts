import { Component } from '@angular/core';
import { getAuth, sendPasswordResetEmail, fetchSignInMethodsForEmail } from 'firebase/auth';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-password',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAnchor,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './password.html',
  styleUrl: './password.css',
})
export class Password {
  email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });

  emailValid = false;

  errorMessage = signal('');

  constructor(private cdr: ChangeDetectorRef, private router: Router) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  resetPassword() {
    const auth = getAuth();
    if (this.email.valid) {
      sendPasswordResetEmail(auth, this.email.value)
        .then(() => {
          // Password reset email sent!
          console.log('Password reset email sent!');
          this.emailValid = true;
          this.cdr.detectChanges();

          // ..
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } else {
      console.log('invalid email');
    }
  }

  checkEmailisRegistered() {
    let isEmailFound = false;
    const auth = getAuth();
    console.log(this.email.value);

    fetchSignInMethodsForEmail(auth, this.email.value)
      .then((signInMethods) => {
        if (signInMethods.length > 0) {
          console.log('Email exists, methods:', signInMethods);
          isEmailFound = true;
        } else {
          this.emailValid = false;
          this.cdr.detectChanges();
          console.log('Email does not exist');
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return isEmailFound;
  }
}
