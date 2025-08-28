import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Applicant {
  id: number;
  name: string;
  email: string;
  phone: string;
  appliedFor: string;
  experience: string;
}


@Component({
  selector: 'app-applicants',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applicants.component.html',
  styleUrl: './applicants.component.scss'
})
export class ApplicantsComponent implements OnInit{

  applicants: Applicant[] = [];

  constructor(private router:Router){}

  ngOnInit() {
    this.applicants = [
      { id: 1, name: 'Lungile H.', email: 'lungile@example.com', phone: '0821234567', appliedFor: 'Frontend Developer', experience: '2-3 years' },
      { id: 2, name: 'Thabo M.', email: 'thabo@example.com', phone: '0812345678', appliedFor: 'Backend Engineer', experience: '3-5 years' },
      { id: 3, name: 'Sihle K.', email: 'sihle@example.com', phone: '0833456789', appliedFor: 'UI/UX Designer', experience: '1-2 years' }
    ];
  }

  viewProfile(applicantId: number) {
    console.log('View profile', applicantId);
    this.router.navigate(['/view-profile', applicantId]);
  }

  goBack() {
    this.router.navigate(['/employer-dashboard']);
  }

}
