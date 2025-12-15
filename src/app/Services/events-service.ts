import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
export interface EventsList {
  Title: string;
  Description: string;
  Image: string;
  Location: string,
  Date: string;
}
@Injectable({
  providedIn: 'root'
})
export class EventsService {
  
private apiUrl = 'https://nationalpartybackend-production.up.railway.app/api/events';

  constructor(private http: HttpClient) { }

  // جلب كل الأخبار
  getEvents(): Observable<EventsList[]> {
    return this.http.get<EventsList[]>(this.apiUrl);
  }

  // إضافة خبر جديد
  addEvents(events: EventsList): Observable<any> {
    return this.http.post(this.apiUrl, events);
  }
 // جلب احدث 3 اخبار
   getLatest3Events(): Observable<EventsList[]> {
    return this.getEvents().pipe(
      map(events => events.slice().reverse().slice(0, 3))  // أول 3 أخبار
    );
  }
}
