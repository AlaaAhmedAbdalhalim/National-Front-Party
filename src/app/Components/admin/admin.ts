import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../Services/admin-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {selectedType: string = 'news'; // فورم الأخبار يظهر افتراضي
newsForm = { title: '', description: '', image: '' ,date:'' };
eventForm = { title: '', description: '', image: '' , date: '',location:''};
memberForm = { name: '', email: '' };
  selectedFile: File | null = null;

  constructor(private adminService: AdminService ,   private http: HttpClient
) {} // <<-- لازم يكون هنا

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0]; // حفظ الملف في المتغير
}

submitNews() {
  const formData = new FormData();
  formData.append('title', this.newsForm.title);
  formData.append('description', this.newsForm.description);
  if (this.selectedFile) {
    formData.append('image', this.selectedFile, this.selectedFile.name);
  }


  this.http.post('http://localhost:3000/api/newsRoutes', formData)
    .subscribe({
      next: (res) => console.log('تم الإرسال', res),
      error: (err) => console.error(err)
    });
}
submitEvent() {
  const formData = new FormData();
  formData.append('title', this.eventForm.title);
  formData.append('description', this.eventForm.description);
  if (this.selectedFile) {
    formData.append('image', this.selectedFile, this.selectedFile.name);
  }

  formData.append('location', this.eventForm.location);

  this.http.post('http://localhost:3000/api/eventsRoutes', formData)
    .subscribe({
      next: (res) => console.log('تم الإرسال', res),
      error: (err) => console.error(err)
    });
}

  onTypeChange(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  this.selectedType = selectElement.value;
}

}
