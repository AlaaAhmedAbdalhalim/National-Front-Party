import { CommonModule } from '@angular/common';
import {  Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.html',
  styleUrls: ['./members.css'],
  imports: [CommonModule]
})
export class Members {
  
  members = [
     {
    name: "أحمد غريب ",
    position: " رئيس الحزب ",
    image: "assets/Members/ِAhmedGharib.png"
  },
   {
    name: "القبطان حسان",
    position: "أمين التنظيم ",
    image: "assets/Members/Hassan.png"
  }, 
  {
    name: "مريم محمد",
    position: "عضو هيئة مكتب ",
    image: "assets/Members/MariamMohamed.png"
  },
   {
    name: "مؤمن صموئيل",
    position: "عضو هيئة مكتب ",
    image: "assets/Members/MomenSamuel.png"
  },
  {
    name: "جمال سنجار",
    position: " أمين الطاقة والثروة المعدنية",
    image: "assets/Members/GamalSanjar.png"
  },
  {
    name: "محمد ممدوح",
    position: " أمين التواصل الجماهيرى",
    image: "assets/Members/MohamedMamdouh.png"
  },

  {
    name: "صلاح عثمان",
    position: " أمين قسم فيصل",
    image: "assets/Members/SalahOthman.png"
  }
];
}