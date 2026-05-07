import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { EnquiryService } from '../../../services/enquiry-service/enquiry.service';
import { Enquiry } from '../../../models/Enquiry';
import { HttpErrorResponse } from '@angular/common/http';
import { EnquiryRequest } from '../../../models/EnquiryRequest';
import { LoadingService } from '../../../services/Loading-Service/loading.service';
import { LoadingSpinnerComponent } from '../../../re-usable-components/loading-spinner/loading-spinner/loading-spinner.component';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule, LoadingSpinnerComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit{

  contactForm!: FormGroup;
  submitted = false;
  success = false;
  errorMessage: string = '';

  contactInfo = [
    { icon: '', title: 'Office', detail: '123 Mangaung, Bloemfontein, Free State' },
    { icon: '', title: 'Phone', detail: '+27 11 123 4567' },
    { icon: '', title: 'Email', detail: 'hello@talentbridge.co.za' },
    { icon: '', title: 'Hours', detail: 'Mon - Fri, 8:00 - 17:00 SAST' }
  ];

  ngOnInit(): void {
    
  }

  constructor(
    private enquiryService:EnquiryService,
    private fb: FormBuilder,
    private location:Location,
    private loading:LoadingService
  )
    {
       this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  goBack(){
    this.location.back();
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';
    if (this.contactForm.invalid) return;
    this.loading.show();
    const request: EnquiryRequest = {
      fullName: this.contactForm.value.name,
      email: this.contactForm.value.email,
      company: this.contactForm.value.company || undefined,
      subject: this.contactForm.value.subject.toUpperCase() as 'HIRING' | 'JOB' | 'PARTNERSHIP' | 'SUPPORT',
      message: this.contactForm.value.message
    };
    this.enquiryService.submitEnquiry(request).subscribe({
      next: (res) => {
        console.log('Enquiry submitted:', res);
        this.success = true;
       this.loading.hide();
        setTimeout(() => {
          this.contactForm.reset();
          this.submitted = false;
          this.success = false;
        }, 3000);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Submit failed:', err);
        this.loading.hide();
        this.errorMessage = err.error?.message || 'Failed to send message. Please try again.';
      }
    });
  }

}
