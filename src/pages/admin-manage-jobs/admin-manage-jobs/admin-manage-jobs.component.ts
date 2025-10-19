import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobPosting } from '../../../models/JobPosting';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { JobService } from '../../../services/Job-Service/job.service';
import { Job } from '../../../models/Job';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-manage-jobs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-manage-jobs.component.html',
  styleUrl: './admin-manage-jobs.component.scss'
})
export class AdminManageJobsComponent implements OnInit {
  
  jobs:Job[] = [];
  filteredJobs: Job[] = [];
  searchTerm = '';
  isLoading = true;
  errorMessage = '';

  constructor(
    private router: Router,
    private location:Location,
    private jobService: JobService
  ) { } 

  ngOnInit(): void {
   this.loadJobs();
  }

loadJobs(): void {
    this.jobService.getAllJobs().subscribe({
      next: (data: Job[]) => {
        this.jobs = data;
        this.filteredJobs = data; // show all by default
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
        this.errorMessage = 'Failed to load job postings.';
        this.isLoading = false;
      }
    });
 }

  viewJobDetails(id: number): void {
    this.router.navigate([`/job-details/${id}`]);
  }

 approveJob(id: number): void {
  this.jobService.approveJob(id).subscribe({
    next: (updatedJob) => {
      const index = this.jobs.findIndex(j => j.id === id);
      if (index !== -1) {
        this.jobs[index] = updatedJob;
        this.filterJobs();
      }
    },
    error: (err) => {
      console.error('Error approving job:', err);
      alert('Failed to approve the job. Please try again.');
    }
  });
 }

rejectJob(id: number): void {
  this.jobService.declineJob(id).subscribe({
    next: (updatedJob) => {
      const index = this.jobs.findIndex(j => j.id === id);
      if (index !== -1) {
        this.jobs[index] = updatedJob;
        this.filterJobs();
      }
    },
    error: (err) => {
      console.error('Error declining job:', err);
      alert('Failed to decline the job. Please try again.');
    }
  });
}

  editJob(id: number): void {
    this.router.navigate([`/admin/jobs/edit/${id}`]);
  }

 
 deleteJob(id: number): void {
  const confirmDelete = confirm('Are you sure you want to delete this job?');
  if (!confirmDelete) return;
  this.jobService.deleteJob(id).subscribe({
    next: () => {
      this.jobs = this.jobs.filter(j => j.id !== id);
      this.filterJobs();
      alert('Job deleted successfully!');
    },
    error: (err) => {
      console.error('Error deleting job:', err);
      alert('Failed to delete the job. Please try again.');
    }
  });
}


  goTo(path: string): void {
    this.router.navigate([`/admin/${path}`]);
  }

  goBack() {
    this.location.back();
  }


  filterJobs(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredJobs = this.jobs.filter(job =>
      job.title?.toLowerCase().includes(term) ||
      job.company?.toLowerCase().includes(term) ||
      job.location?.toLowerCase().includes(term)
    );
  }


}
