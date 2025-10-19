import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { DashboardStats } from '../../../models/DashboardStats';
import { TopNavbarComponent } from '../../../re-usable-components/top-navbar/top-navbar.component';
import { JobService } from '../../../services/Job-Service/job.service';
import { UserService } from '../../../services/User-Service/user.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, TopNavbarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit{

  adminName: string = 'Admin';
  stats: DashboardStats = {
    totalJobs: 0,
    totalEmployers: 0,
    totalCandidates: 0,
    totalApplications: 0,
    pendingApprovals: 0
  };

  recentActivity: string[] = [];

  constructor(
    private router: Router,
    private jobService: JobService,
    private userService: UserService
  ){}

  ngOnInit() {
    this.loadDashboardData();
    this.loadStats();
  }


  loadDashboardData(): void {
    // ✅ Fetch total jobs
    this.jobService.getAllJobs().subscribe({
      next: (jobs) => this.stats.totalJobs = jobs.length,
      error: (err) => console.error('Failed to load jobs:', err)
    });

    // ✅ Fetch total employers
    this.userService.getEmployerCount().subscribe({
      next: (count) => this.stats.totalEmployers = count,
      error: (err) => console.error('Failed to load employer count:', err)
    });

    // You can expand later for candidates/applications
    this.recentActivity = [
      'New employer "TechSoft Ltd" registered',
      'Candidate John Doe applied for "Frontend Developer"',
      'Job post "Marketing Specialist" approved'
    ];
  }


  goTo(page: string) {
    this.router.navigateByUrl(page);
    console.log(`Navigate to ${page}`);
  }

  loadStats() {
  this.userService.getEmployeeCount().subscribe({
    next: (count) => {
      this.stats.totalCandidates = count;
    },
    error: (err) => {
      console.error('Error fetching employee count:', err);
    }
  });
}

}
