import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Job } from '../../../models/Job';
import { JobService } from '../../../services/Job-Service/job.service';

@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.scss'
})
export class PostJobComponent implements OnInit{

  job = {
    title: '',
    company: '',
    location: '',
    type: '',
    description: '',
    requirements: [] as string[],
    salary: '',
    userId: 0
  };

  constructor(
    private router: Router,
    private jobService: JobService
  ){}

  ngOnInit(){
    const loggedInUserId = Number(localStorage.getItem('userId')) || 1;
    this.job.userId = loggedInUserId;
  }

  submitJob() {
    if (!this.job.title || !this.job.company || !this.job.location) {
      alert('Please fill in all required fields.');
      return;
    }
    this.jobService.createJob(this.job).subscribe({
      next: (response) => {
        alert('Job posted successfully!');
        this.router.navigate(['/employer-dashboard']);
      },
      error: (err) => {
        console.error('Error posting job', err);
        alert('Failed to post job. Please try again.');
      }
    });
  }

  cancel() {
    this.router.navigate(['/employer-dashboard']);
  }
  
}
