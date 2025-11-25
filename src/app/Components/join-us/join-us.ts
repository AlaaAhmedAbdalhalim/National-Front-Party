import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-join-us',
  standalone: false,
  templateUrl: './join-us.html',
  styleUrl: './join-us.css',
})
export class JoinUs {

  currentStep = 0;
  totalSteps = 4;

  get progress() {
    return ((this.currentStep + 1) / this.totalSteps) * 100;
  }

  nextStep() {
    if (this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  submitForm() {
    alert("تم إرسال الطلب بنجاح");
  }
}

