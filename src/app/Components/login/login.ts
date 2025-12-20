import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('LOGIN RESPONSE 👉', res);

        this.authService.saveAuthData(res.token, res.user.role);
        this.router.navigate(['/Admin']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed';
      }
    });
  }

}
