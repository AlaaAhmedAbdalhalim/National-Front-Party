import { Component } from '@angular/core';
import { MembersList, MembersService } from '../../Services/members-service';

@Component({
  selector: 'app-members',
  standalone: false,
  templateUrl: './members.html',
  styleUrl: './members.css',
})
export class Members {
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
