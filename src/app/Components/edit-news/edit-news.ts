import { Component } from '@angular/core';
import { NewsList, NewsService } from '../../Services/news-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-news',
  standalone: false,
  templateUrl: './edit-news.html',
  styleUrl: './edit-news.css'
})
export class EditNews {

  new!: NewsList;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.newsService.getNews().subscribe(data => {
      const found = data.find(m => m.id === id);
      if (found) {
        this.new = { ...found };
      }
    });
  }

 updateNews() {
  console.log('Sending:', this.new);

  this.newsService.editNews(this.new).subscribe({
    next: res => {
      console.log('Success:', res);
      alert('تم التعديل بنجاح');
      this.router.navigate(['/news']);
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

    this.new.Image = await this.resizeImage(file, 800, 800);
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
