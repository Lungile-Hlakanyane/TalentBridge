import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Job } from '../../../models/Job';

@Component({
  selector: 'app-manage-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-jobs.component.html',
  styleUrl: './manage-jobs.component.scss'
})
export class ManageJobsComponent implements OnInit{

  jobs: Job[] = [];

  constructor(private router:Router){}

    // Modal state
  showDeleteModal: boolean = false;
  jobToDelete: Job | null = null;

  ngOnInit(){
     this.jobs = [
      {
        id: 1, title: 'Frontend Developer', company: 'Tech Solutions', location: 'Johannesburg', type: 'Full-time', description: 'Build amazing web apps',
        requirements: []
      },
      {
        id: 2, title: 'Backend Engineer', company: 'Innovate Inc', location: 'Cape Town', type: 'Contract', description: 'Develop APIs and services',
        requirements: []
      },
      {
        id: 3, title: 'UI/UX Designer', company: 'Creative Minds', location: 'Remote', type: 'Part-time', description: 'Design beautiful interfaces',
        requirements: []
      }
    ];
  }

  editJob(jobId: number) {
    console.log('Edit job', jobId);
    this.router.navigate(['/post-job'], { queryParams: { id: jobId } });
  }

   deleteJob() {
    if (this.jobToDelete) {
      this.jobs = this.jobs.filter(job => job.id !== this.jobToDelete!.id);
      console.log('Deleted job', this.jobToDelete.id);
      this.closeModal();
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
}
