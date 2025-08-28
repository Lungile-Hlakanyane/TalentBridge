import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Job } from '../../../models/Job';

@Component({
  selector: 'app-view-jobs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-jobs.component.html',
  styleUrl: './view-jobs.component.scss'
})
export class ViewJobsComponent implements OnInit{

   jobs: Job[] = [];

  constructor(private router:Router,){}

  ngOnInit() {
    this.jobs = [
      {
        id: 1,
        title: 'Frontend Developer',
        company: 'TechCorp',
        location: 'Remote',
        type: 'Full-time',
        description: 'We are looking for a skilled Angular developer.',
        requirements: ['Angular', 'TypeScript', 'HTML', 'CSS']
      },
      {
        id: 2,
        title: 'Backend Engineer',
        company: 'Cloudify',
        location: 'Cape Town, South Africa',
        type: 'Contract',
        description: 'Work on scalable backend services using Spring Boot.',
        requirements: ['Java', 'Spring Boot', 'REST APIs', 'SQL']
      },
      {
        id: 3,
        title: 'UI/UX Designer',
        company: 'Creative Minds',
        location: 'Johannesburg, South Africa',
        type: 'Part-time',
        description: 'Design modern, user-friendly web and mobile interfaces.',
        requirements: ['Figma', 'Adobe XD', 'UI Design', 'UX Research']
      }
    ];
  }

  goBack() {
   this.router.navigate(['']); 
  }

  applyJob(job: Job) {
   console.log('Applying to:', job);
  }

  viewJob(id: number) {
    this.router.navigate(['/view-job', id]);
    console.log(`View job ${id}`);
  }

}
