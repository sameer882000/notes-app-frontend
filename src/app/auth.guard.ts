// auth.guard.ts
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private router: Router) { }

    canActivate(): boolean {
        if (localStorage.getItem('token')) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}

export const authGuard = () => inject(AuthGuard).canActivate();
