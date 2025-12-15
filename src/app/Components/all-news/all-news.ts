import { Component } from '@angular/core';
import { NewsList, NewsService } from '../../Services/news-service';

@Component({
  selector: 'app-all-news',
  standalone: false,
  templateUrl: './all-news.html',
  styleUrl: './all-news.css'
})
export class AllNews {
  newsList: NewsList[] = [];  

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
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
}
