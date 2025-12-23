import { Component } from '@angular/core';
import { NewsList, NewsService } from '../../Services/news-service';
import { AuthService } from '../../Services/auth-service';

@Component({
  selector: 'app-all-news',
  standalone: false,
  templateUrl: './all-news.html',
  styleUrl: './all-news.css'
})
export class AllNews {
  newsList: NewsList[] = [];  
  isAdmin: boolean = false;

  constructor(private newsService: NewsService , private authService: AuthService) {}

  ngOnInit(): void {
        this.checkIfAdmin();
    this.loadNews();
  }

  loadNews() {
    this.newsService. getNews().subscribe({
      next: (data) => {
        this.newsList = data;
        console.log(this.newsList);
      },
      error: (err) => {
        console.error('Error loading news', err);
      }
    });
  }
  
  // 🔐 تحديد هل المستخدم Admin ولا لأ
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
  
  
    // 🗑️ DELETE
    deleteNews(id: number) {
      if (!confirm('هل أنت متأكد من الحذف؟')) return;
  
      this.newsService.deleteNews(id).subscribe({
        next: () => {
          this.newsList = this.newsList.filter(m => m.id !== id);
        },
        error: (err) => {
          console.error('Delete error', err);
        }
      });
    }
}
