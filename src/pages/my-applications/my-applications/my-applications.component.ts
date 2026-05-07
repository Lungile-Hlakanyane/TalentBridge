import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../../services/Application-Service/application.service';
import { JobService } from '../../../services/Job-Service/job.service';
import { ApplicationWithJob } from '../../../models/ApplicationWithJob';

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-applications.component.html',
  styleUrl: './my-applications.component.scss'
})
export class MyApplicationsComponent implements OnInit {

  applications: ApplicationWithJob[] = [];
  currentUserEmail = '';
  currentUserId: number | null = null;

  constructor(
    private router:Router,
    private applicationService:ApplicationService,
    private jobService:JobService
  ){}

 ngOnInit() {
    this.currentUserEmail = localStorage.getItem('email') || '';
    if (this.currentUserEmail) {
      this.loadUserApplications(this.currentUserEmail);
    }
  }


  loadUserApplications(userEmail: string) {
    this.applicationService.getApplicationsForUser(userEmail).subscribe({
      next: (response: ApplicationWithJob[]) => {
        this.applications = response;
      },
      error: (err) => console.error('Error fetching applications:', err)
    });
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
