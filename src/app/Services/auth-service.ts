import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://nationalpartybackend-production.up.railway.app/api/auth';

  private roleSubject = new BehaviorSubject<string | null>(
    sessionStorage.getItem('role')
  );

  public role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  saveAuthData(token: string, role: string) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('role', role);
    this.roleSubject.next(role); // 🔥 يحدث الهيدر فورًا
  }

  logout() {
    sessionStorage.clear();
    this.roleSubject.next(null);
  }

  isAdmin(): boolean {
    return sessionStorage.getItem('role') === 'admin';
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
}


