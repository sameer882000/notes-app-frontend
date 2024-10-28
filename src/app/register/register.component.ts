import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Adjust path as necessary
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onRegister() {
    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        // Redirect to login or notes page after registration
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error);
  
        // Check if there's an array of errors and alert the first error message
        if (error.error.errors && error.error.errors.length > 0) {
          alert(error.error.errors[0].msg);
        } else {
          // Default fallback message if no specific error message is found
          alert(error.error.msg);
        }
      }
    });
  }
  
}
