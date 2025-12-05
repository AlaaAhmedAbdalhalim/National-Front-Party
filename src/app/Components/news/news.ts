import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NewsList ,NewsService } from '../../Services/news-service';

@Component({
  selector: 'app-news',
  standalone: false,
  templateUrl: './news.html',
  styleUrl: './news.css',
})
export class News {
 
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
