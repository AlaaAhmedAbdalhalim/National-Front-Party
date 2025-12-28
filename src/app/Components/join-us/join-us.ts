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
  progress = 25;

  membershipForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.membershipForm = this.fb.group({

      /* ===== STEP 1 ===== */
      FullName: ['', Validators.required],
      BirthDate: ['', Validators.required],
      Gender: ['', Validators.required],
      MaritalStatus: ['', Validators.required],

      /* ===== STEP 2 ===== */
      Address: ['', Validators.required],
      PartyUnit: ['', Validators.required],
      Governorate: ['السويس', Validators.required],
      District: ['', Validators.required],
      Phone: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],

      /* ===== STEP 3 ===== */
      NationalId: ['', Validators.required],
      IdExpiryDate: ['', Validators.required],
      IdFrontImage: [null, Validators.required],
      IdBackImage: [null, Validators.required],
      PersonalPhoto: [null, Validators.required],
      EducationLevel: ['', Validators.required],
      HigherDegree: ['', Validators.required],
      JobTitle: ['', Validators.required],
      JobAddress: ['', Validators.required],
      WorkPlace: ['', Validators.required],

      /* ===== STEP 4 ===== */
      PreviousParty: ['', Validators.required],
      ParliamentMember: ['', Validators.required],
      UnionMembership: ['', Validators.required],
      Awards: ['', Validators.required],
      AgreeTerms: [false, Validators.requiredTrue],
      ConfirmData: [false, Validators.requiredTrue]
    });
  }

  /* ================= Navigation ================= */

  nextStep() {
    if (this.isCurrentStepValid()) {
      this.currentStep++;
      this.updateProgress();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.membershipForm.markAllAsTouched();
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.updateProgress();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  updateProgress() {
    this.progress = ((this.currentStep + 1) / this.totalSteps) * 100;
  }

  /* ================= Validation per step ================= */

  isCurrentStepValid(): boolean {

    const stepsControls: string[][] = [

      // STEP 1
      ['FullName', 'BirthDate', 'Gender', 'MaritalStatus'],

      // STEP 2
      ['Address', 'PartyUnit', 'Governorate', 'District', 'Phone', 'Email'],

      // STEP 3
      [
        'NationalId', 'IdExpiryDate', 'IdFrontImage', 'IdBackImage',
        'PersonalPhoto', 'EducationLevel', 'HigherDegree',
        'JobTitle', 'JobAddress', 'WorkPlace'
      ],

      // STEP 4
      [
        'PreviousParty', 'ParliamentMember',
        'UnionMembership', 'Awards',
        'AgreeTerms', 'ConfirmData'
      ]
    ];

    return stepsControls[this.currentStep]
      .every(control => this.membershipForm.get(control)?.valid);
  }

  /* ================= File Upload ================= */

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.membershipForm.patchValue({
        [controlName]: file
      });
    }
  }

  /* ================= Submit ================= */

  submitForm() {

    if (this.membershipForm.invalid) {
      this.membershipForm.markAllAsTouched();
      return;
    }

    // لو في inputs disabled (زي Governorate)
    this.membershipForm.get('Governorate')?.enable();

    console.log('DATA TO SEND 👉', this.membershipForm.value);

    alert('تم إرسال الطلب بنجاح');
  }}

