import { Component } from '@angular/core';
import { MembersList, MembersService } from '../../Services/members-service';

@Component({
  selector: 'app-all-members',
  standalone: false,
  templateUrl: './all-members.html',
  styleUrl: './all-members.css'
})
export class AllMembers {
  membersList: MembersList[] = [];  

  constructor(private membersService: MembersService) {}

  ngOnInit(): void {
    this.loadMembers();
  }
    encodeImage(image: string): string {
    return encodeURIComponent(image);
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
    

}
