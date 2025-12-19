import { auth } from './firebase';// Path to your firebase config
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  return new Promise((resolve) => {
    // 1. Check if Firebase already knows the user (fastest)
    if (auth.currentUser) {
      return resolve(true);
    }

    // 2. Otherwise, wait for the state to change
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Clean up immediately
      if (user) {
        resolve(true);
      } else {
        console.log("Guard: No user found, redirecting to login");
        resolve(router.parseUrl('/login'));
      }
    }, (error) => {
      console.error("Auth Guard Error:", error);
      resolve(router.parseUrl('/login'));
    });

    // 3. Absolute Fallback: If nothing happens in 2 seconds, redirect
    setTimeout(() => {
      if (!auth.currentUser) {
        console.warn("Auth check timed out.");
        resolve(router.parseUrl('/login'));
      }
    }, 2000);
  });
};