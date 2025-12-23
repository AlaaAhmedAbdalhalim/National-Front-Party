import { Component } from '@angular/core';
import { EventsList, EventsService } from '../../Services/events-service';
import { AuthService } from '../../Services/auth-service';

@Component({
  selector: 'app-all-events',
  standalone: false,
  templateUrl: './all-events.html',
  styleUrl: './all-events.css'
})
export class AllEvents {
  eventsList: EventsList[] = [];  
  isAdmin: boolean = false;


  constructor(private eventsService: EventsService , 
    private authService: AuthService ) {}

  ngOnInit(): void {
        this.checkIfAdmin();
    this.loadEvents();
  }

  loadEvents() {
    this.eventsService. getEvents().subscribe({
      next: (data) => {
        this.eventsList = data;
        console.log(this.eventsList);
      },
      error: (err) => {
        console.error('Error loading Events', err);
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
  deleteEvent(id: number) {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;

    this.eventsService.deleteEvents(id).subscribe({
      next: () => {
        this.eventsList = this.eventsList.filter(m => m.id !== id);
      },
      error: (err) => {
        console.error('Delete error', err);
      }
    });
  }
}
