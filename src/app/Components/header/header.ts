import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  role: string | null = null;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.authService.role$.subscribe(role => {
      this.role = role;
    });
  }

logout() {
  console.log('FORCE LOGOUT');

  sessionStorage.removeItem('token');
  sessionStorage.removeItem('role');

  // reset observable
  this.authService['roleSubject'].next(null);

  // reload كامل
  window.location.href = '/';
}

}
