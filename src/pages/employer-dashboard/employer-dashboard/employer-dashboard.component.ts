import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobService } from '../../../services/Job-Service/job.service';
import { Job } from '../../../models/Job';
import { UserService } from '../../../services/User-Service/user.service';
import { TopNavbarComponent } from '../../../re-usable-components/top-navbar/top-navbar.component';
import { ApplicationService } from '../../../services/Application-Service/application.service';
import { forkJoin } from 'rxjs';
import { InterviewService } from '../../../services/interview-service/interview.service';
import { LoadingService } from '../../../services/Loading-Service/loading.service';
import { CookieBannerComponen } from '../../../re-usable-components/cookie-banner/cookie-banner/cookie-banner.component';

@Component({
  selector: 'app-employer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, TopNavbarComponent,CookieBannerComponen],
  templateUrl: './employer-dashboard.component.html',
  styleUrl: './employer-dashboard.component.scss'
})
export class EmployerDashboardComponent implements OnInit{
  isMobile = false;
  showMenu = false;

  @HostListener('window:resize', ['$event'])
    onResize(event: any) {
    this.isMobile = event.target.innerWidth <= 768;
   }

  constructor(
    private router: Router,
    private jobService: JobService,
    private userService:UserService,
    private applicationService:ApplicationService,
    private interviewService:InterviewService,
    private loading:LoadingService
  ){}

  ngOnInit() {
    this.isMobile = window.innerWidth <= 768;
    this.loadEmployerDetails();
    this.loadActiveJobs();
    this.loadInterviewCount();
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
          this.applicationService.getUniqueApplicantCount(job.id)
          );
          forkJoin(applicationRequests).subscribe({
          next: (counts) => {
          counts.forEach((count, index) => {
          (this.activeJobs[index] as any).applicants = count;
           this.insights.totalApplicants += count;
          });
          }
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

loadInterviewCount() {
  const userId = Number(localStorage.getItem('userId'));
  if (userId) {
    this.interviewService.getInterviewCountByUserId(userId)
      .subscribe((count: any) => {
        this.insights.interviews = count;
      }, (error:any) => {
        console.error('Error fetching interview count:', error);
      });
  } else {
    console.warn('No userId found in localStorage');
  }
}


toggleMenu() {
  this.showMenu = !this.showMenu;
}

logout() {
    this.loading.show();
    this.router.navigate(['/login']).then(() => {
      localStorage.clear();
      this.loading.hide();
    });
}

navigate(link:string){
    this.router.navigate([link]);
}

}
