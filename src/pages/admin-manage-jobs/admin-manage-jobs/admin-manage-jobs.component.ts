import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobPosting } from '../../../models/JobPosting';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-manage-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-manage-jobs.component.html',
  styleUrl: './admin-manage-jobs.component.scss'
})
export class AdminManageJobsComponent implements OnInit {

  jobs: JobPosting[] = [];

  constructor(private router: Router) { } 

  ngOnInit(): void {
    this.loadMockJobs();
  }

   loadMockJobs(): void {
    this.jobs = [
      { id: 1, title: 'Frontend Developer', company: 'TechSoft Ltd', location: 'Cape Town, SA', status: 'pending' },
      { id: 2, title: 'Backend Engineer', company: 'CodeWorks Inc', location: 'Johannesburg, SA', status: 'approved' },
      { id: 3, title: 'UI/UX Designer', company: 'CreativeHub', location: 'Remote', status: 'rejected' },
      { id: 4, title: 'Project Manager', company: 'GlobalCorp', location: 'Durban, SA', status: 'pending' }
    ];
  }

  viewJobDetails(id: number): void {
    this.router.navigate([`/job-details/${id}`]);
  }

  approveJob(id: number): void {
    const job = this.jobs.find(j => j.id === id);
    if (job) job.status = 'approved';
  }

  rejectJob(id: number): void {
    const job = this.jobs.find(j => j.id === id);
    if (job) job.status = 'rejected';
  }

  editJob(id: number): void {
    this.router.navigate([`/admin/jobs/edit/${id}`]);
  }

  deleteJob(id: number): void {
    this.jobs = this.jobs.filter(j => j.id !== id);
  }

  goTo(path: string): void {
    this.router.navigate([`/admin/${path}`]);
  }

}
