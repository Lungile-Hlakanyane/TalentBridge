import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';


@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent implements OnInit{

  lastUpdated = 'April 23, 2026';

  constructor(private location:Location){}

   sections: any[] = [
    {
      id: 'info-collect',
      title: '1. Information We Collect',
      content: [
        'Personal Information: Name, email, phone, resume, and professional details you provide when creating an account or applying for roles.',
        'Company Information: Company name, job descriptions, and hiring requirements submitted by employers.',
        'Usage Data: IP address, browser type, pages visited, and time spent on TalentBridge to improve our platform.',
        'Cookies: We use essential cookies for login and analytics cookies to understand usage patterns.'
      ]
    },
    {
      id: 'how-use',
      title: '2. How We Use Your Information',
      content: [
        'To match candidates with relevant job opportunities and employers with qualified talent.',
        'To communicate with you about applications, interviews, and platform updates.',
        'To improve our matching algorithms and user experience.',
        'To comply with legal obligations and prevent fraud.',
        'We never sell your personal data to third parties.'
      ]
    },
    {
      id: 'sharing',
      title: '3. Information Sharing',
      content: [
        'With Employers: Your profile and resume are shared with employers when you apply to their jobs or consent to be featured.',
        'With Candidates: Job descriptions and company info are shown to candidates to facilitate applications.',
        'Service Providers: We use trusted partners like AWS for hosting and SendGrid for emails, bound by confidentiality.',
        'Legal Requirements: We may disclose data if required by law or to protect TalentBridge rights.'
      ]
    },
    {
      id: 'data-security',
      title: '4. Data Security & Retention',
      content: [
        'We use encryption, secure servers, and access controls to protect your data.',
        'Resumes and personal data are retained while your account is active or as needed to provide services.',
        'You can request deletion of your account and data at any time by emailing privacy@talentbridge.co.za.',
        'Despite our efforts, no system is 100% secure. Report breaches to security@talentbridge.co.za immediately.'
      ]
    },
    {
      id: 'your-rights',
      title: '5. Your Rights',
      content: [
        'Access: Request a copy of the personal data we hold about you.',
        'Correction: Update inaccurate or incomplete information in your profile.',
        'Deletion: Request deletion of your account and associated data.',
        'Opt-out: Unsubscribe from marketing emails via the link in any email.',
        'POPIA Compliance: As a South African company, we comply with the Protection of Personal Information Act.'
      ]
    },
    {
      id: 'contact',
      title: '6. Contact Us',
      content: [
        'For privacy questions or requests, contact our Data Protection Officer:',
        'Email: privacy@talentbridge.co.za',
        'Address: 123 Mangaung, Bloemfontein, Free State, South Africa',
        'We will respond to all requests within 30 days.'
      ]
    }
  ];

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
  
  goBack(){
    this.location.back();
  }
  ngOnInit(): void {
   
  }

}
