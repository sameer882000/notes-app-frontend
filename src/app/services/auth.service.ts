// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'https://notes-app-backend-production-49eb.up.railway.app'; // Adjust based on your backend URL

    constructor(private http: HttpClient, private router: Router) { }

    register(username: string, password: string) {
        return this.http.post(`${this.apiUrl}/register`, { username, password });
    }

    login(username: string, password: string) {
        return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
            .subscribe(res => {
                localStorage.setItem('token', res.token);
                this.router.navigate(['/notes']); // Redirect to notes page
            });
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']); // Redirect to login page
    }
}
