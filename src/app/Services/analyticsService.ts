
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  trackPageView(url: string) {
    if ((window as any).analytics) {
      (window as any).analytics.trackPageview(url);
    }
  }
}
