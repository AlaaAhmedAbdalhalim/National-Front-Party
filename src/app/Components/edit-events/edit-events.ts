import { Component } from '@angular/core';
import { EventsList, EventsService } from '../../Services/events-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-events',
  standalone: false,
  templateUrl: './edit-events.html',
  styleUrl: './edit-events.css'
})
export class EditEvents {

  event!: EventsList;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.eventsService.getEvents().subscribe(data => {
      const found = data.find(m => m.id === id);
      if (found) {
        this.event = { ...found };
      }
    });
  }

 updateEvent() {
  console.log('Sending:', this.event);

  this.eventsService.editEvent(this.event).subscribe({
    next: res => {
      console.log('Success:', res);
      alert('تم التعديل بنجاح');
      this.router.navigate(['/events']);
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

    this.event.Image = await this.resizeImage(file, 800, 800);
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
