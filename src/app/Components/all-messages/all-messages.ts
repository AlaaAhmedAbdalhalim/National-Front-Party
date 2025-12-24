import { Component } from '@angular/core';
import { Messages, MessagesList } from '../../Services/messages';

@Component({
  selector: 'app-all-messages',
  standalone: false,
  templateUrl: './all-messages.html',
  styleUrl: './all-messages.css'
})
export class AllMessages {

  selectedType: string = '';
  messages: MessagesList[] = [];
  
    constructor(private message: Messages ) {}
  
    ngOnInit(): void {
      
      this.loadMessages();
    }
  
    loadMessages() {
      this.message.getMessages().subscribe({
        next: (data) => {
          this.messages = data;
          console.log(this.messages);
        },
        error: (err) => {
          console.error('Error loading messages', err);
        }
      });
    }
    
}
