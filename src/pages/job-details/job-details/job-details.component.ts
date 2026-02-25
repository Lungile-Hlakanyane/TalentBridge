import { Component, OnInit } from '@angular/core';
import { JobDetails } from '../../../models/JobDetails';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobService } from '../../../services/Job-Service/job.service';
import { Location } from '@angular/common';

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
    private router: Router,
    private jobService:JobService,
    private location: Location
  )
    {}

  ngOnInit(): void {
     const jobId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadJob(jobId);
  }
  
  loadJob(id: number): void {
  this.jobService.getJobById(id).subscribe({
    next: (job) => {
      this.job = job as JobDetails;
    },
    error: (err) => {
      console.error('Error fetching job:', err);
    }
  });
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

  goBack() {
    this.location.back();
  }

}
