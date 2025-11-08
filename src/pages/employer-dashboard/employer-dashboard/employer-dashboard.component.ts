import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobService } from '../../../services/Job-Service/job.service';
import { Job } from '../../../models/Job';
import { UserService } from '../../../services/User-Service/user.service';
import { TopNavbarComponent } from '../../../re-usable-components/top-navbar/top-navbar.component';
import { ApplicationService } from '../../../services/Application-Service/application.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-employer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, TopNavbarComponent],
  templateUrl: './employer-dashboard.component.html',
  styleUrl: './employer-dashboard.component.scss'
})
export class EmployerDashboardComponent implements OnInit{

  constructor(
    private router: Router,
    private jobService: JobService,
    private userService:UserService,
    private applicationService:ApplicationService
  ){}

  ngOnInit() {
    this.loadEmployerDetails();
    this.loadActiveJobs();
  }

  activeJobs: Job[] = [];
  employerName: string = '';

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
          if (!jobs || jobs.length === 0) {
            this.activeJobs = [];
            return;
          }

          // Sort jobs (latest first)
          this.activeJobs = jobs.sort(
            (a, b) =>
              new Date(b.created ?? 0).getTime() - new Date(a.created ?? 0).getTime()
          );

          this.insights.jobsPosted = this.activeJobs.length;
          const applicationRequests = this.activeJobs.map((job) =>
            this.applicationService.getApplicationsForJob(job.id)
          );
          forkJoin(applicationRequests).subscribe({
            next: (results) => {
              this.insights.totalApplicants = 0;
              results.forEach((applications, index) => {
                const job = this.activeJobs[index];
                const count = applications ? applications.length : 0;
                (job as any).applicants = count;
                this.insights.totalApplicants += count;
              });
            },
            error: (err) => console.error('Error fetching application counts:', err)
          });
        },
        error: (err) => console.error('Error fetching jobs:', err)
      });
    } else {
      console.warn('No userId found in localStorage');
    }
  }

  loadEmployerDetails() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUserById(Number(userId)).subscribe({
        next: (user) => {
          this.employerName = user.companyName || user.name; 
        },
        error: (err) => {
          console.error('Error fetching employer details:', err);
        }
      });
    } else {
      console.warn('No userId found in localStorage');
    }
  }

}
