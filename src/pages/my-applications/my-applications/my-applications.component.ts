import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from '../../../models/Application';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../../services/Application-Service/application.service';
import { JobService } from '../../../services/Job-Service/job.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-applications.component.html',
  styleUrl: './my-applications.component.scss'
})
export class MyApplicationsComponent implements OnInit {

  applications: Application[] = [];

  constructor(
    private router:Router,
    private applicationService:ApplicationService,
    private jobService:JobService
  ){}

ngOnInit() {
  const userEmail = localStorage.getItem('email');
  if (userEmail) {
    this.applicationService.getApplicationsForUser(userEmail).subscribe({
      next: (response: any[]) => {
        const jobRequests = response.map(app =>
          this.jobService.getJobById(app.jobId)
        );

        forkJoin(jobRequests).subscribe({
          next: (jobDetailsArray: any[]) => {
            this.applications = response.map((application, index) => ({
              id: application.id,
              jobId: application.jobId,
              status: application.status,
              appliedDate: application.appliedAt,
              title: jobDetailsArray[index].title,
              company: jobDetailsArray[index].company
            }));
          },
          error: (err) => console.error('Error fetching job details:', err)
        });
      },
      error: (err) => console.error('Error fetching applications:', err)
    });
  }
}



  goBack() {
    this.router.navigateByUrl('/');
  }

  viewApplication(id: number) {
    console.log('Viewing application with ID:', id);
  }

  browseJobs(link:string){
    this.router.navigateByUrl(link);
  }

}
