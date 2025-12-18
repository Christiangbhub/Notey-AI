import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { User } from './pages/user/user';
import { Notes } from './pages/notes/notes';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'newUser', component: User },
    { path: 'notes', component: Notes },
];

