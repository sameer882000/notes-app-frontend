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
        return this.http.post(`${this.apiUrl}/register`, { username, password })
    }

    login(username: string, password: string) {
        return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
            .subscribe({
                next: (res: any) => {
                    localStorage.setItem('token', res.token);
                    this.router.navigate(['/notes']); // Redirect to notes page
                },
                error: (error) => {
                    // Check if there's an error message and alert it
                    if (error.error?.msg) {
                        alert(error.error.msg);
                    } else {
                        // Fallback message if error message is unavailable
                        alert('An error occurred. Please try again.');
                    }
                }
            });
    }
    

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/login']); // Redirect to login page
    }
}
