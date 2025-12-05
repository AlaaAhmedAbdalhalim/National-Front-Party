import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  addNews(data: FormData) {
    return this.http.post(`${this.baseUrl}/newsRoutes`, data);
  }

  addEvent(data: any) {
    return this.http.post(`${this.baseUrl}/events`, data);
  }

  addMember(data: any) {
    return this.http.post(`${this.baseUrl}/members`, data);
  }
}
