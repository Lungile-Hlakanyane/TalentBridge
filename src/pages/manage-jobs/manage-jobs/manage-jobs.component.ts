import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Job } from '../../../models/Job';
import { JobService } from '../../../services/Job-Service/job.service';
import { LoadingService } from '../../../services/Loading-Service/loading.service';
import { LoadingSpinnerComponent } from '../../../re-usable-components/loading-spinner/loading-spinner/loading-spinner.component';


@Component({
  selector: 'app-manage-jobs',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './manage-jobs.component.html',
  styleUrl: './manage-jobs.component.scss'
})
export class ManageJobsComponent implements OnInit{

  jobs: Job[] = [];

  constructor(
    private router:Router,
    private jobService:JobService,
    private loading:LoadingService
  ){}

    // Modal state
  showDeleteModal: boolean = false;
  jobToDelete: Job | null = null;

  ngOnInit(){
     this.loadUserJobs();
  }

  editJob(jobId: number) {
    console.log('Edit job', jobId);
    this.router.navigate(['/post-job'], { queryParams: { id: jobId } });
  }

deleteJob() {
    if (this.jobToDelete) {
      this.loading.show();
      this.jobService.deleteJob(this.jobToDelete.id).subscribe({
        next: () => {
          this.jobs = this.jobs.filter(j => j.id !== this.jobToDelete?.id);
          this.closeModal();
        },
        error: (err) => console.error('Delete error:', err),
        complete: () => this.loading.hide()
      });
    }
  }

  goBack() {
    this.router.navigate(['/employer-dashboard']);
  }

    
  closeModal() {
    this.showDeleteModal = false;
    this.jobToDelete = null;
  }

  confirmDeleteJob(job: Job) {
    this.jobToDelete = job;
    this.showDeleteModal = true;
  }

  loadUserJobs() {
    const userId = localStorage.getItem('userId'); // comes from login
    if (userId) {
      this.jobService.getJobsByUserId(Number(userId)).subscribe({
        next: (data) => {
          this.jobs = data;
          console.log('Jobs fetched for user:', data);
        },
        error: (err) => {
          console.error('Error fetching jobs:', err);
        }
      });
    } else {
      console.warn('No userId found in localStorage!');
    }
  }
}
