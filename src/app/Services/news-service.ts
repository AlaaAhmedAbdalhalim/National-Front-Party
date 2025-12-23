import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface NewsList {
  id: number;
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
  return this.http.get<NewsList[]>(this.apiUrl).pipe(
    map(news =>
      news.sort(
        (a, b) =>
          new Date(b.Date).getTime() -
          new Date(a.Date).getTime()
      )
    )
  );
}

  // إضافة خبر جديد
  addNews(news: NewsList): Observable<any> {
    return this.http.post(this.apiUrl, news);
  }
 // جلب احدث 3 اخبار
  getLatest3News(): Observable<NewsList[]> {
  return this.getNews().pipe(
    map(news => 
      news
        .slice() // نسخ المصفوفة عشان ما نغيرش الأصل
        .sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()) // ترتيب من الأحدث للأقدم
        .slice(0, 3) // أول 3 أخبار
    )
  );
}

  editNews(news: NewsList) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  return this.http.put(
    `${this.apiUrl}/${news.id}`,
    news,
    { headers }
  );
}
 deleteNews(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
