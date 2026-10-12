import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Auth } from '../../auth';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  private authService = inject(Auth);
  private snackBar = inject(MatSnackBar);

  email = new FormControl('', [Validators.required, Validators.email]);
  loading = signal(false);
  emailSent = signal(false);

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

  async resetPassword() {
    if (this.email.invalid) {
      this.email.markAsTouched();
      return;
    }
    this.loading.set(true);
    try {
      await this.authService.resetPassword(this.email.value ?? '');
      this.emailSent.set(true);
    } catch (err: any) {
      this.snackBar.open(this.toMessage(err.code), 'Close', {
        duration: 5000,
        verticalPosition: 'top',
      });
    } finally {
      this.loading.set(false);
    }
  }
}
