import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobService } from '../../../services/Job-Service/job.service';
import { Job } from '../../../models/Job';


@Component({
  selector: 'app-employer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employer-dashboard.component.html',
  styleUrl: './employer-dashboard.component.scss'
})
export class EmployerDashboardComponent implements OnInit{

  constructor(
    private router: Router,
    private jobService: JobService
  ){}

  ngOnInit() {
    this.loadActiveJobs();
  }

  activeJobs: Job[] = [];
  employerName = 'Vincent Technologies (PTY) LTD';

  insights = {
    jobsPosted: 0,
    totalApplicants: 0,
    interviews: 0
  };

  goTo(page: string) {
    this.router.navigateByUrl(page);
    console.log(`Navigate to ${page}`);
  }

  manageJob(id: number) {
    this.router.navigate(['/manage-job', id]);
    console.log(`Managing job with ID: ${id}`);
  }

   loadActiveJobs() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.jobService.getJobsByUserId(Number(userId)).subscribe({
        next: (jobs) => {
          // Sort by created date descending to show most recent first
          this.activeJobs = jobs.sort(
            (a, b) =>
              new Date(b.created ?? 0).getTime() - new Date(a.created ?? 0).getTime()
          );
          this.insights.jobsPosted = this.activeJobs.length;
          // Optionally calculate total applicants if Job model has applicants field
          this.insights.totalApplicants = this.activeJobs.reduce((sum, job) => sum + (job.applicants || 0), 0);
        },
        error: (err) => console.error('Error fetching jobs:', err)
      });
    } else {
      console.warn('No userId found in localStorage');
    }
  }

}
