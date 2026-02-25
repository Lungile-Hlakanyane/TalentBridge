import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../../services/Application-Service/application.service';
import { JobService } from '../../../services/Job-Service/job.service';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/User-Service/user.service';
import { finalize } from 'rxjs/operators';
import { FileService } from '../../../services/File-service/file.service';

interface Applicant {
encodedResumePath: any;
  id: number;
  applicantName: string;
  applicantEmail: string;
  phone: string;
  appliedFor: string;
  experience: string;
  appliedAt: string;
  resumePath: string;
}

@Component({
  selector: 'app-applicants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './applicants.component.html',
  styleUrl: './applicants.component.scss'
})
export class ApplicantsComponent implements OnInit{
[x: string]: any;

  filteredApplicants: Applicant[] = [];
  searchTerm: string = '';
  applicants: Applicant[] = [];
  employerId: number | null = null;
  isLoading: boolean = true;  

  constructor(
    private router:Router,
    private applicationService: ApplicationService,
    private jobService: JobService,
    private userService: UserService,
    private fileService:FileService
  ){}

  ngOnInit() {
   this.loadApplicants();
  }

  viewProfile(applicantId: number) {
  console.log('View profile', applicantId);
  this.router.navigate(['/view-profile', applicantId]); 
}


  goBack() {
    this.router.navigate(['/employer-dashboard']);
  }

  loadApplicants() {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      alert('You must be logged in to view applicants.');
      this.router.navigate(['/login']);
      return;
    }
    this.employerId = Number(storedUserId);
    this.isLoading = true;
    this.jobService.getJobsByUserId(this.employerId).subscribe({
      next: (jobs) => {
        if (!jobs || jobs.length === 0) {
          this.isLoading = false;
          this.applicants = [];
          return;
        }
        const applicationRequests = jobs.map(job =>
          this.applicationService.getApplicationsForJob(job.id)
        );
        forkJoin(applicationRequests)
          .pipe(finalize(() => (this.isLoading = false)))
          .subscribe({
            next: (results) => {
              const combinedApplicants: Applicant[] = [];
              results.forEach((applications, index) => {
                const job = jobs[index];
                applications.forEach(app => {
                  combinedApplicants.push({
                    id: app.id,
                    applicantName: app.applicantName,
                    applicantEmail: app.applicantEmail,
                    appliedFor: job.title,
                    experience: app.experience || 'N/A',
                    appliedAt: app.appliedAt,
                    resumePath: app.resumePath,
                    phone: '',
                    encodedResumePath: undefined
                  });
                });
              });
              combinedApplicants.forEach((applicant) => {
                this.userService.getUserByEmail(applicant.applicantEmail).subscribe({
                  next: (user) => {
                    applicant.phone = user.phone || 'N/A';
                  },
                  error: () => {
                    applicant.phone = 'N/A';
                  },
                });
              });
              this.applicants = combinedApplicants;
              this.filteredApplicants = [...this.applicants];
            },
            error: (err) => {
              console.error('Failed to fetch applications:', err);
            }
          });
      },
      error: (err) => {
        console.error('Failed to fetch jobs:', err);
        this.isLoading = false;
      }
    });
  }

  
filterApplicants() {
  const term = this.searchTerm.toLowerCase().trim();
  if (!term) {
    this.filteredApplicants = [...this.applicants];
    return;
  }
  this.filteredApplicants = this.applicants.filter(applicant => {
    return applicant.applicantName.toLowerCase().includes(term) ||
           applicant.applicantEmail.toLowerCase().includes(term) ||
           applicant.appliedFor.toLowerCase().includes(term);
  });
}

  navigate(link:string){
    this.router.navigateByUrl(link);
  }

  navigateToStages(applicant: any){
   this.router.navigate(['/stages'], { state: { applicant } });
  }

viewResume(filename: string) {
  this.fileService.openFile(filename);
}



}
