import { Component, OnInit } from '@angular/core';
import { JobDetails } from '../../../models/JobDetails';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss'
})
export class JobDetailsComponent implements OnInit{

  job!: JobDetails;

  constructor(
    private route: ActivatedRoute, 
    private router: Router)
    {}

  ngOnInit(): void {
     const jobId = Number(this.route.snapshot.paramMap.get('id'));
     this.loadMockJob(jobId);
  }

   loadMockJob(id: number): void {
    this.job = {
      id,
      title: 'Frontend Developer',
      company: 'TechSoft Ltd',
      location: 'Cape Town, SA',
      description: 'We are looking for a skilled frontend developer to join our team and work on exciting projects.',
      requirements: [
        '3+ years experience with Angular or React',
        'Strong HTML, CSS, and JavaScript knowledge',
        'Experience with responsive design',
        'Familiarity with Git and Agile workflows'
      ],
      applicants: 120,
      shortlisted: 25,
      rejected: 40,
      postedDate: new Date('2025-08-15'),
      status: 'pending'
    };
  }

   approveJob(): void {
    this.job.status = 'approved';
  }

  rejectJob(): void {
    this.job.status = 'rejected';
  }

  editJob(): void {
    this.router.navigate([`/admin/jobs/edit/${this.job.id}`]);
  }

  deleteJob(): void {
    alert(`Job "${this.job.title}" deleted`);
    this.router.navigate(['/admin/manage-jobs']);
  }

  goTo(path: string): void {
    this.router.navigate([`/admin/${path}`]);
  }

}
