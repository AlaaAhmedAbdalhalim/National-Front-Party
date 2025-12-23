import { Component } from '@angular/core';
import { MembersList, MembersService } from '../../Services/members-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-member',
  standalone: false,
  templateUrl: './edit-member.html',
  styleUrl: './edit-member.css'
})
export class EditMember {

  member!: MembersList;

  constructor(
    private route: ActivatedRoute,
    private membersService: MembersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.membersService.getMembers().subscribe(data => {
      const found = data.find(m => m.id === id);
      if (found) {
        this.member = { ...found };
      }
    });
  }

 updateMember() {
  console.log('Sending:', this.member);

  this.membersService.editMember(this.member).subscribe({
    next: res => {
      console.log('Success:', res);
      alert('تم التعديل بنجاح');
      this.router.navigate(['/members']);
    },
    error: err => {
      console.error('Update error:', err);
      alert(err.error?.message || 'فشل التعديل');
    }
  });
}


  async onImageChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.member.Image = await this.resizeImage(file, 800, 800);
  }

  resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = maxWidth;
          canvas.height = maxHeight;
          canvas.getContext('2d')?.drawImage(img, 0, 0, maxWidth, maxHeight);
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
        img.src = e.target!.result as string;
      };
      reader.readAsDataURL(file);
    });
  }
}
