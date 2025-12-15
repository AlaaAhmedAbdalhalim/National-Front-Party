import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface NewsList {
  Title: string;
  Description: string;
  Image: string;
  Date: string;
}

@Injectable({
  providedIn: 'root'
})

export class NewsService {

private apiUrl = 'https://nationalpartybackend-production.up.railway.app/api/news';

  constructor(private http: HttpClient) { }

  // جلب كل الأخبار
  getNews(): Observable<NewsList[]> {
    return this.http.get<NewsList[]>(this.apiUrl);
  }

  // إضافة خبر جديد
  addNews(news: NewsList): Observable<any> {
    return this.http.post(this.apiUrl, news);
  }
 // جلب احدث 3 اخبار
   getLatest3News(): Observable<NewsList[]> {
    return this.getNews().pipe(
      map(news => news.slice().reverse().slice(0, 3))  // أول 3 أخبار
    );
  }
}
