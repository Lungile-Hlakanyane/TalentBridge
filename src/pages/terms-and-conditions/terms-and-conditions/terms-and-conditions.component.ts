import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.scss'
})
export class TermsAndConditionsComponent implements OnInit{

  lastUpdated = '24 April 2026';

   sections: any[] = [
    {
      id: 'agency-terms',
      title: '1. Agency Terms',
      content: [
        'TalentBridge operates as a recruitment agency and software platform.',
        'By posting a job or submitting candidates, you agree that any candidate introduced via TalentBridge is subject to a placement fee of 15% of the candidate’s first year annual CTC.',
        'The fee applies if you hire the candidate within 12 months of introduction, directly or indirectly.'
      ]
    },
    {
      id: 'platform-use',
      title: '2. Use of Platform',
      content: [
        'Employers may not circumvent TalentBridge by contacting candidates directly using information from watermarked CVs, emails, or the platform.',
        'Circumvention or breach of this clause makes the full placement fee immediately payable.',
        'You are granted a limited licence to use TalentBridge ATS features for recruitment only.'
      ]
    },
    {
      id: 'candidate-data',
      title: '3. Candidate Data & POPIA',
      content: [
        'We process personal information in compliance with the Protection of Personal Information Act (POPIA).',
        'Candidate data is used solely for recruitment purposes and stored securely in South Africa.',
        'Candidates may request access, correction, or deletion of their data at any time via privacy@talentbridge.co.za.'
      ]
    },
    {
      id: 'payment-terms',
      title: '4. Payment Terms',
      content: [
        'Placement invoices are issued on candidate start date and payable within 30 days.',
        'Late payments incur interest of 2% per month compounded.',
        'Featured Job posts at R499 are billed upfront and non-refundable.',
        'A free replacement is provided if the placed candidate leaves within 3 months of start date.'
      ]
    },
    {
      id: 'liability',
      title: '5. Limitation of Liability',
      content: [
        'TalentBridge provides introductions and software tools only. We do not warrant candidate performance, qualifications, or cultural fit.',
        'Our total liability is limited to the placement fee paid for the specific candidate.',
        'We are not liable for indirect or consequential losses arising from use of the platform.'
      ]
    },
    {
      id: 'termination',
      title: '6. Termination',
      content: [
        'Either party may terminate platform access with 30 days written notice.',
        'Termination does not affect fees owed for candidates already introduced.',
        'We may suspend accounts for breach of these terms, non-payment, or fraudulent activity.'
      ]
    }
  ];

  constructor(
    private scroller: ViewportScroller,
    private location:Location)
  {}

  scrollTo(id: string): void {
    this.scroller.scrollToAnchor(id);
  }

  goBack(){
    this.location.back();
  }
  ngOnInit(): void {
   
  }

}
