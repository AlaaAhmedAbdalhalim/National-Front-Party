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
  
}
