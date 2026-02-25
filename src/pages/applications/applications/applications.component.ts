import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Application } from '../../../models/Application';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApplicationService } from '../../../services/Application-Service/application.service';
import { JobService } from '../../../services/Job-Service/job.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss'
})
export class ApplicationsComponent implements OnInit {

  applications: Application[] = [];
  searchTerm = '';

  constructor(
    private router: Router,
    private location: Location,
    private applicationService:ApplicationService,
    private jobService:JobService
  ) { }

  ngOnInit(): void {
    this.loadApplications();
  }


  viewApplicantProfile(candidateId: number): void {
    this.router.navigate([`/admin/candidate-details/${candidateId}`]);
  }

  goTo(path: string): void {
    this.router.navigate([`/admin/${path}`]);
  }

  goBack() {
    this.location.back();
  }

  loadApplications(): void {
   this.applicationService.getAllApplications().subscribe({
    next: (applications) => {
      this.applications = applications;
      this.applications.forEach(app => {
        this.jobService.getJobById(app.jobId).subscribe({
          next: (job) => {
            app.jobDetails = job;
          },
          error: (err) => console.error('Failed to load job details:', err)
        });
      });
    },
    error: (err) => console.error('Failed to load applications:', err)
  });
}

filterApplications(): void {
  const filteredApplications = this.applications.filter(app => {
    const searchTermLower = this.searchTerm.toLowerCase();
    return app.applicantName.toLowerCase().includes(searchTermLower) ||
           app.jobDetails?.company.toLowerCase().includes(searchTermLower) ||
           app.jobDetails?.location.toLowerCase().includes(searchTermLower) ||
           app.jobDetails?.title.toLowerCase().includes(searchTermLower);
  });
  this.applications = filteredApplications;
}

}
