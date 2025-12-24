import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface MessagesList {
  id?: number;
  FullName: string;
  Phone: number;
  Message:string;
  Email:string;
}
@Injectable({
  providedIn: 'root'
})
export class Messages {
  
private apiUrl = 'https://nationalpartybackend-production.up.railway.app/api/messages';

  constructor(private http: HttpClient) { }

  // جلب كل الأخبار
  getMessages(): Observable<MessagesList[]> {
    return this.http.get<MessagesList[]>(this.apiUrl);
  }

  // إضافة خبر جديد
  addMessages(messages: MessagesList): Observable<any> {
    return this.http.post(this.apiUrl, messages);
  }
}
