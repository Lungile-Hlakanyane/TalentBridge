import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { JobService } from '../../../services/Job-Service/job.service';
import { LoadingService } from '../../../services/Loading-Service/loading.service';
import { LoadingSpinnerComponent } from '../../../re-usable-components/loading-spinner/loading-spinner/loading-spinner.component';


@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.scss'
})
export class PostJobComponent implements OnInit{
  @ViewChild('jobForm') jobForm!:NgForm;

  job = {
  title: '',
  company: '',
  location: '',
  type: '',
  description: '',
  requirements: [] as string[],
  salary: '',
  userId: 0,
  numberOfYears: '',
  qualifications: '',
  skills: '',
  otherRequirements: '',
  nameOfQualification: ''
};


  constructor(
    private router: Router,
    private jobService: JobService,
    private location: Location,
    private loading:LoadingService
  ){}

  ngOnInit(){
    const loggedInUserId = Number(localStorage.getItem('userId')) || 1;
    this.job.userId = loggedInUserId;
  }

  goBack(){
    this.location.back();
  }

  submitJob() {
    if (this.jobForm.invalid) {
      Object.keys(this.jobForm.controls).forEach(key => {
        this.jobForm.controls[key].markAsTouched();
      });
      return;
    }
    this.loading.show();
    this.jobService.createJob(this.job).subscribe({
      next: (response) => {
        this.loading.hide();
        alert('Job posted successfully!');
        this.router.navigate(['/employer-dashboard']);
      },
      error: (err) => {
        this.loading.hide();
        console.error('Error posting job', err);
        alert('Failed to post job. Please try again.');
      }
    });
  }

  cancel() {
    this.router.navigate(['/employer-dashboard']);
  }
  
}
