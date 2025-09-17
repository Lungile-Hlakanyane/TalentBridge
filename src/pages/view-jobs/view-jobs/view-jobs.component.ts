import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Job } from '../../../models/Job';
import { JobService } from '../../../services/Job-Service/job.service';

@Component({
  selector: 'app-view-jobs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-jobs.component.html',
  styleUrl: './view-jobs.component.scss'
})
export class ViewJobsComponent implements OnInit{

   jobs: Job[] = [];

  constructor(
    private router:Router,
    private jobService: JobService
  ){}

  ngOnInit() {
   this.loadJobs();
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

  loadJobs() {
    this.jobService.getAllJobs().subscribe({
      next: (jobs) => {
        this.jobs = jobs.sort((a, b) => 
          new Date(b.created ?? 0).getTime() - new Date(a.created ?? 0).getTime()
        );
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
      }
    });
  }


}
