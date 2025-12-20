import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../Services/admin-service';
import { AuthService } from '../../Services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
  imports: [FormsModule, CommonModule]
})
export class Admin {

  selectedType: string = 'news';

  newsForm = {
    title: '',
    description: '',
    image: '',
    date: ''
  };

  eventForm = {
    title: '',
    description: '',
    image: '',
    location: '',
    date: ''
  };

  memberForm = {
    Name: '',
    Position: '',
    Image: ''
  };

  selectedNewsFile: File | null = null;
  selectedEventFile: File | null = null;
  selectedMemberFile: File | null = null;

  sent = false;

  constructor(
    private adminService: AdminService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}/* 
ngOnInit() {
  if (!this.authService.isAdmin()) {
    this.router.navigate(['/']);
  }
} */

  /* ================= FILE SELECT ================= */

  onNewsFileSelected(event: any) {
    this.selectedNewsFile = event.target.files[0] || null;
  }

  onEventsFileSelected(event: any) {
    this.selectedEventFile = event.target.files[0] || null;
  }

  onMemberFileSelected(event: any) {
    this.selectedMemberFile = event.target.files[0] || null;
  }

  /* ================= IMAGE RESIZE ================= */

  resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const img = new Image();

        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = height * (maxWidth / width);
            width = maxWidth;
          }

          if (height > maxHeight) {
            width = width * (maxHeight / height);
            height = maxHeight;
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          const base64 = canvas.toDataURL('image/jpeg', 0.7);
          resolve(base64);
        };

        img.onerror = err => reject(err);
        img.src = e.target.result;
      };

      reader.onerror = err => reject(err);
      reader.readAsDataURL(file);
    });
  }

  /* ================= SUCCESS ALERT ================= */

  showSuccess() {
    this.sent = true;
    setTimeout(() => {
      this.sent = false;
    }, 3000);
  }

  /* ================= SUBMIT NEWS ================= */

  submitNews() {
    if (!this.selectedNewsFile) return;

    this.resizeImage(this.selectedNewsFile, 800, 600).then(base64 => {
      const payload = {
        Title: this.newsForm.title,
        Description: this.newsForm.description,
        Image: base64,
        Date: this.newsForm.date
      };

      this.http.post(
        'https://nationalpartybackend-production.up.railway.app/api/news',
        payload
      ).subscribe({
        next: () => {
          this.newsForm = { title: '', description: '', image: '', date: '' };
          this.selectedNewsFile = null;
          this.showSuccess();
        },
        error: err => console.error(err)
      });
    });
  }

  /* ================= SUBMIT EVENT ================= */

  submitEvent() {
    if (!this.selectedEventFile) return;

    this.resizeImage(this.selectedEventFile, 800, 600).then(base64 => {
      const payload = {
        Title: this.eventForm.title,
        Description: this.eventForm.description,
        Image: base64,
        Location: this.eventForm.location,
        Date: this.eventForm.date
      };

      this.http.post(
        'https://nationalpartybackend-production.up.railway.app/api/events',
        payload
      ).subscribe({
        next: () => {
          this.eventForm = {
            title: '',
            description: '',
            image: '',
            location: '',
            date: ''
          };
          this.selectedEventFile = null;
          this.showSuccess();
        },
        error: err => console.error(err)
      });
    });
  }

  /* ================= SUBMIT MEMBER ================= */

  submitMember() {
    if (!this.selectedMemberFile) return;

    this.resizeImage(this.selectedMemberFile, 800, 600).then(base64 => {
      const payload = {
        Name: this.memberForm.Name,
        Position: this.memberForm.Position,
        Image: base64
      };

      this.http.post(
        'https://nationalpartybackend-production.up.railway.app/api/members',
        payload
      ).subscribe({
        next: () => {
          this.memberForm = { Name: '', Position: '', Image: '' };
          this.selectedMemberFile = null;
          this.showSuccess();
        },
        error: err => console.error(err)
      });
    });
  }

  /* ================= TYPE CHANGE ================= */

  onTypeChange(event: Event) {
    this.selectedType = (event.target as HTMLSelectElement).value;
  }
}
