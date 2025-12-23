import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface MembersList {
  id: number;
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

  getLastest8Members(): Observable<MembersList[]> {
    return this.getMembers().pipe(
      map(members => members.slice().reverse().slice(0, 8))  // أول 3 أخبار
    );
  }
  
  deleteMember(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

editMember(member: MembersList) {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.put(
    `${this.apiUrl}/${member.id}`,
    member,
    { headers }
  );
}

}
