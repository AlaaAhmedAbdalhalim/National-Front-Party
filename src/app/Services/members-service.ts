import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface MembersList {
  Name: string;
  Position: string;
  Image:string
}

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  
private apiUrl = 'https://nationalpartybackend-production.up.railway.app/api/members';

  constructor(private http: HttpClient) { }

  // جلب كل الأخبار
  getMembers(): Observable<MembersList[]> {
    return this.http.get<MembersList[]>(this.apiUrl);
  }

  // إضافة خبر جديد
  addMembers(members: MembersList): Observable<any> {
    return this.http.post(this.apiUrl, members);
  }
 // جلب احدث 3 اخبار
   getLatest3News(): Observable<MembersList[]> {
    return this.getMembers().pipe(
      map(members => members.slice().reverse().slice(0, 3))  // أول 3 أخبار
    );
  }
}
