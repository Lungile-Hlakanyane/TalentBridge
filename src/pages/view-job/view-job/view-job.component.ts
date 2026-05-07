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
import { switchMap } from 'rxjs';
import { throwError} from 'rxjs';
import { take } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

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

   // New flags for UI messages
  success: boolean = false;
  errorMsg: string = '';
  submitBtnDisabled: boolean = false;
  showSuccessModal: boolean = false;

  constructor(
   private route:ActivatedRoute,
   private router: Router,
   private jobService:JobService,
   private subscriptionService:SubscriptionService,
   private applicationService: ApplicationService,
   private loading:LoadingService,
   private cdr: ChangeDetectorRef,
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

  navigate(link:string){
    this.router.navigateByUrl(link);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

 submitApplication() {
  this.closeModal();
  if (this.submitBtnDisabled) return; // Prevent double submit

  if (!this.job) {
    this.errorMsg = 'Job not found.';
    return;
  }
  if (!this.selectedFile) {
    this.errorMsg = 'Please upload your resume/CV.';
    return;
  }

  this.submitBtnDisabled = true;
  this.success = false;
  this.errorMsg = '';

  this.applicationService.getApplicationsForUser(this.application.email).pipe(
    take(1),
    switchMap(applications => {
      const hasApplied = applications.some((app: { jobId: number }) => app.jobId === this.job?.id);
      if (hasApplied) {
        return throwError(() => new Error(`You have already applied for ${this.job?.title}`));
      }
      
      const jobApplication: JobApplication = {
        jobId: this.job?.id!,
        applicantName: this.application.name,
        applicantEmail: this.application.email,
        coverLetter: this.application.coverLetter
      };
      this.showSuccessModal = true;
      return this.applicationService.applyForJob(jobApplication, this.selectedFile!).pipe(take(1));
    })
  ).subscribe({
    next: (res) => {
      console.log('Got response:', res); // Check if this logs
      this.success = true;
      this.submitBtnDisabled = false;
      this.application = { name: '', email: '', coverLetter: '' };
      this.selectedFile = null;
      this.cdr.detectChanges(); // Force UI update

      setTimeout(() => {
        this.closeModal();
        this.success = false;
        this.cdr.detectChanges();
      }, 3000);
    },
    error: (err) => {
      this.submitBtnDisabled = false;
      if (err.message?.includes('already applied')) {
        this.errorMsg = err.message;
      } else {
        this.errorMsg = 'Failed to submit application. Please try again.';
      }
      this.cdr.detectChanges();
      console.error('Error:', err);
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
    this.job = {
      ...data,
      requirements: [
        ...data.skills.split(',').map((skill: string) => skill.trim()),
        ...data.otherRequirements.split(',').map((req: string) => req.trim())
      ]
    };
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
