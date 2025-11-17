import { Component } from '@angular/core';

@Component({
  selector: 'app-members',
  standalone: false,
  templateUrl: './members.html',
  styleUrl: './members.css',
})
export class Members {
members = [
  {
    image: 'assets/Members/AhmedGhareeb.jpeg',
    name: 'أحمد غريب',
    role: 'رئيس الحزب'
  },
  {
    image: 'assets/Members/Hassan.jpeg',
    name: 'القبطان حسان',
    role: 'أمين التنظيم'
  },
  {
    image: 'assets/Members/MariamMohamed.jpeg',
    name: 'مريم محمد',
    role: 'عضو هيئة مكتب'
  },
  {
    image: 'assets/Members/MomenSamuel.jpeg',
    name: 'مؤمن صموئيل',
    role: 'عضو هيئة مكتب'
  },
  {
    image: 'assets/Members/Mamdouh.jpeg',
    name: 'محمد ممدوح',
    role: 'عضو هيئة مكتب'
  },
  {
    image: 'assets/Members/Salah.jpeg',
    name: 'صلاح عثمان',
    role: 'عضو هيئة مكتب'
  },
   {
    image: 'assets/Members/Sanjar.jpeg',
    name: 'جمال سنجر',
    role: 'أمين الطاقة  والثروة المعدنية'
  },
];

}
