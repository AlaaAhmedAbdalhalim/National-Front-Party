import { Component } from '@angular/core';
import { Messages, MessagesList } from '../../Services/messages';

@Component({
  selector: 'app-contact-us',
  standalone: false,
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
})
export class ContactUS {

  constructor(private messagesService: Messages) {}

  addMessage(form: any) {
    if (form.invalid) return;

    const messageData: MessagesList = {
      FullName: form.value.FullName,
      Email: form.value.Email,
      Phone: form.value.Phone,
      Message: form.value.Message
    };

    this.messagesService.addMessages(messageData).subscribe({
      next: () => {
        alert('تم إرسال رسالتك بنجاح! شكرًا لتواصلك معنا 🌸');
        form.reset();
      },
      error: (err) => {
        console.error(err);
        alert('حصل خطأ أثناء الإرسال ❌');
      }
    });
  }
}
