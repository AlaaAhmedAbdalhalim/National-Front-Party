import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import * as AOS from 'aos';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router
  ) {}

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 800,
        once: false,
      });

    
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd && (window as any).analytics) {
          (window as any).analytics.trackPageview(event.urlAfterRedirects);
        }
      });
    }
  }
}
