import { Component, OnInit } from '@angular/core';
import { Job } from '../../../models/Job';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../../services/Job-Service/job.service';
import { Subscription } from '../../../models/Subscription';
import { SubscriptionService } from '../../../services/Subscription-Service/subscription.service';
import { ApplicationService } from '../../../services/Application-Service/application.service';
import { JobApplication } from '../../../models/JobApplication';
import { LoadingService } from '../../../services/Loading-Service/loading.service';
import { LoadingSpinnerComponent } from '../../../re-usable-components/loading-spinner/loading-spinner/loading-spinner.component';


@Component({
  selector: 'app-view-job',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './view-job.component.html',
  styleUrl: './view-job.component.scss'
})
export class ViewJobComponent implements OnInit{

  job: Job | undefined;
  jobs: Job[] = [];

  subscriberEmail: string = '';   
  userId: any | null = null;         

  showModal: boolean = false;
  selectedFile: File | null = null;

  constructor(
   private route:ActivatedRoute,
   private router: Router,
   private jobService:JobService,
   private subscriptionService:SubscriptionService,
   private applicationService: ApplicationService,
   private loading:LoadingService
  ){}

  application = {
    name: '',
    email: '',
    coverLetter: ''
  };

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

   onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

   submitApplication() {
    if (!this.job) {
      alert('Job not found.');
      return;
    }

    const jobApplication: JobApplication = {
      jobId: this.job.id!,
      applicantName: this.application.name,
      applicantEmail: this.application.email,
      coverLetter: this.application.coverLetter,
      resumePath: this.selectedFile ? this.selectedFile.name : undefined // later replace with upload
    };

    this.loading.show();
    this.applicationService.applyForJob(jobApplication).subscribe({
      next: (res) => {
        console.log('Application submitted:', res);
        alert(`Application submitted for "${this.job?.title}" at ${this.job?.company}`);
        this.closeModal();
        this.application = { name: '', email: '', coverLetter: '' };
        this.selectedFile = null;
        this.loading.hide();
      },
      error: (err) => {
        console.error('Error submitting application:', err);
        alert('Failed to submit application. Please try again.');
        this.loading.hide();
      }
    });
  }

 ngOnInit() {

   const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = Number(storedUserId);
    }

    const jobId = Number(this.route.snapshot.paramMap.get('id'));
    if (jobId) {
      this.jobService.getJobById(jobId).subscribe({
        next: (data) => {
          this.job = data;
          console.log('Loaded job:', data);
        },
        error: (err) => {
          console.error('Error fetching job', err);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  applyJob() {
    console.log('Applying to job:', this.job);
    alert(`You have applied to "${this.job?.title}" at ${this.job?.company}`);
  }

  subscribeToJobAlert() {
    if (!this.subscriberEmail || !this.job) {
      alert('Please enter a valid email.');
      return;
    }
    const subscription: Subscription = {
      userId: this.userId,
      email: this.subscriberEmail,
      jobRole: this.job.title
    };
    this.loading.show();
    this.subscriptionService.createSubscription(subscription).subscribe({
      next: (res) => {
        console.log('Subscription successful:', res);
        alert(`Subscribed to alerts for "${this.job?.title}" jobs!`);
        this.subscriberEmail = '';
        this.loading.hide();
      },
      error: (err) => {
        console.error('Error subscribing:', err);
        alert('Failed to subscribe. Please try again.');
        this.loading.hide();
      }
    });
  }

}
