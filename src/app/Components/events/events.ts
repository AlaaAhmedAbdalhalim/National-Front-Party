import { Component } from '@angular/core';
import { EventsList, EventsService } from '../../Services/events-service';

@Component({
  selector: 'app-events',
  standalone: false,
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events {


  eventsList: EventsList[] = [];  

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
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

}
