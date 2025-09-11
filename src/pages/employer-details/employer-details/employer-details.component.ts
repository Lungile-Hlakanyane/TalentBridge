import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from '../../../models/Job';
import { Employer } from '../../../models/Employer';
import { Activity } from '../../../models/Activity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employer-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employer-details.component.html',
  styleUrl: './employer-details.component.scss'
})
export class EmployerDetailsComponent implements OnInit{

  employer!: Employer;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.loadMockEmployer(1);
  }

  
  loadMockEmployer(id: number): void {
    this.employer = {
      id,
      companyName: 'TechSoft Ltd',
      email: 'hr@techsoft.com',
      status: 'approved',
      description: 'TechSoft Ltd is a leading software company specializing in web and mobile applications.',
      registeredDate: new Date('2025-01-15'),
      jobs: [
        { id: 1, title: 'Frontend Developer', location: 'Cape Town', status: 'approved' },
        { id: 2, title: 'Backend Developer', location: 'Remote', status: 'pending' }
      ],
      activityHistory: [
        { date: new Date('2025-08-01'), action: 'Approved job post: Frontend Developer' },
        { date: new Date('2025-08-05'), action: 'Submitted job post: Backend Developer' }
      ]
    };
  }

  viewJobDetails(jobId: number): void {
    this.router.navigate([`/admin/job-details/${jobId}`]);
  }

  goTo(path: string): void {
    this.router.navigate([`/admin/${path}`]);
  }

}
