import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatCard,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  userName: string | null = '';
  formShow: boolean = false;
  userSave: boolean = false;

  ngOnInit(): void {
    this.loadUserData();
  }

  changeUserName(name: string | null) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      updateProfile(user, {
        displayName: name,
      })
        .then(() => {
          // 1. Manually update the local variable so the UI updates
          this.userName = name;
          this.userSave = true;
          this.formShow = false;

          console.log('Profile has been updated');

          // 2. Trigger change detection to ensure Angular sees the change
          this.cdr.detectChanges();
        })
        .catch((error) => {
          console.error('Update failed:', error);
        });
    } else {
      console.log('No user is currently signed in');
    }
  }

  loadUserData() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // this.userName = user.displayName
        console.log(`User display name: ${user.displayName}`);

        if (user.displayName == null) {
          this.userName = 'User';
        } else {
          this.userName = user.displayName;
        }
        this.cdr.detectChanges();

        const uid = user.uid;
        console.log(`User UID: ${uid}`);
      } else {
        console.log('user is signed out');
      }
    });
  }
}
