import { Component } from '@angular/core';
import { MembersList, MembersService } from '../../Services/members-service';
import { AuthService } from '../../Services/auth-service';

@Component({
  selector: 'app-all-members',
  standalone: false,
  templateUrl: './all-members.html',
  styleUrl: './all-members.css'
})
export class AllMembers {
  membersList: MembersList[] = [];  
  isAdmin: boolean = false;

  constructor(private membersService: MembersService, private authService: AuthService) {}

  ngOnInit(): void {
        this.checkIfAdmin();
    this.loadMembers();
  }
    encodeImage(image: string): string {
    return encodeURIComponent(image);
  }
 checkIfAdmin() {
const token = this.authService.getToken();
    if (!token) {
      this.isAdmin = false;
      return;
    }

    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      this.isAdmin = decoded.role === 'admin';
    } catch (e) {
      this.isAdmin = false;
    }
  }
  loadMembers() {
    this.membersService. getMembers().subscribe({
      next: (data) => {
        this.membersList = data;
        console.log(this.membersList);
      },
      error: (err) => {
        console.error('Error loading Mebers', err);
      }
    });
  }
    

  // 🗑️ DELETE
  deleteMember(id: number) {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;

    this.membersService.deleteMember(id).subscribe({
      next: () => {
        this.membersList = this.membersList.filter(m => m.id !== id);
      },
      error: (err) => {
        console.error('Delete error', err);
      }
    });
  }
}
