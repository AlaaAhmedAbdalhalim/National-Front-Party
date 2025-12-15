import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../Services/admin-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
  imports: [FormsModule, CommonModule]
})
export class Admin {
  selectedType: string = 'news'; 
  newsForm = { title: '', description: '', image: '', date: '' };
  eventForm = { title: '', description: '', image: '', date: '', location: '' };
  memberForm = { name: '', email: '' };

  // نفصل الملفات لكل نوع
  selectedNewsFile: File | null = null;
  selectedEventFile: File | null = null;
  selectedMemberFile: File | null = null;

  constructor(private adminService: AdminService, private http: HttpClient) { }

  // اختيار الملف للأخبار
  onNewsFileSelected(event: any) {
    this.selectedNewsFile = event.target.files[0];
  }

  // اختيار الملف للأحداث
  onEventsFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedEventFile = file; // ✅ مهم

    const reader = new FileReader();
    reader.onload = () => {
      this.eventForm.image = reader.result as string; // Base64
    };
    reader.readAsDataURL(file);
  }

  // اختيار الملف للأعضاء
  onMemberFileSelected(event: any) {
    this.selectedMemberFile = event.target.files[0];
  }

  // إرسال الأخبار
  submitNews() {
    const formData = new FormData();
    formData.append('title', this.newsForm.title);
    formData.append('description', this.newsForm.description);
    if (this.selectedNewsFile) {
      formData.append('image', this.selectedNewsFile, this.selectedNewsFile.name);
    }

    this.http.post('https://nationalpartybackend-production.up.railway.app/api/news', formData)
      .subscribe({
        next: (res) => {
          console.log('تم إرسال الأخبار', res);
          this.newsForm = { title: '', description: '', image: '', date: '' };
          this.selectedNewsFile = null;
        },
        error: (err) => console.error('خطأ في إرسال الأخبار', err)
      });
  }

  // إرسال الأحداث
 // أضف الوظيفة لتصغير الصورة
resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // تعديل الأبعاد حسب الحد الأقصى
        if (width > maxWidth) {
          height = height * (maxWidth / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = width * (maxHeight / height);
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        // تحويل للـ Base64 مع ضغط الجودة 0.7
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        resolve(dataUrl);
      };
      img.onerror = error => reject(error);
      img.src = event.target.result;
    };
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

// نسخة نهائية من submitEvent()
submitEvent() {
  if (!this.selectedEventFile) {
    console.error('يجب اختيار صورة للحدث');
    return;
  }

  // تصغير الصورة وتحويلها Base64
  this.resizeImage(this.selectedEventFile, 800, 600)
    .then(base64 => {
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
        next: res => {
          console.log('تم إرسال الحدث بنجاح', res);

          // مسح الفورم بعد الإرسال
          this.eventForm = { title: '', description: '', image: '', location: '', date: '' };
          this.selectedEventFile = null;
        },
        error: err => console.error('خطأ في إرسال الحدث', err)
      });
    })
    .catch(err => {
      console.error('خطأ في معالجة الصورة', err);
    });
}

  // تغيير النوع (News / Event / Member)
  onTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedType = selectElement.value;
  }
}
