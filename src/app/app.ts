import { Component, OnInit, signal } from '@angular/core';
import * as AOS from 'aos'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
 ngOnInit(): void {
  AOS.init({
    duration: 800, // مدة الحركة بالمللي ثانية
    once: false,   // true = تتحرك مرة واحدة فقط
  });
}

  protected readonly title = signal('Party');
}
