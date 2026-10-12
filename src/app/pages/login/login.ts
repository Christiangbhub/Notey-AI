import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgModel } from '@angular/forms';
import { MatAnchor } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatAnchor,
    MatButtonModule,
    MatIcon,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  password: string = '';
  hide: boolean = true;

  constructor(
    private router: Router,
    private authService: Auth,
    private snackBar: MatSnackBar,
  ) {}

  private toMessage(code: string): string {
    switch (code) {
      case 'auth/invalid-credential':
        return 'Incorrect email or password.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.';
      default:
        return 'Something went wrong. Please try again.';
    }
  }

  async onLogin() {
    try {
      await this.authService.login(this.email, this.password);
      this.snackBar.open('Logged in!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      await this.router.navigate(['/home']);
    } catch (err: any) {
      this.snackBar.open(this.toMessage(err.code), 'Close', {
        duration: 5000,
        verticalPosition: 'top',
      });
    }
  }

  onCreateUser() {
    this.router.navigate(['/newUser']);
  }
}
