import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { User } from './pages/user/user';
import { Notes } from './pages/notes/notes';
import { authGuard } from './auth-guard';
import { Jokes } from './pages/jokes/jokes';
import { Home } from './pages/home/home';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'newUser', component: User },
    { path: 'jokes', component: Jokes },
    { path: 'home', component: Home },
    { path: 'notes', component: Notes, canActivate: [authGuard] },
];

