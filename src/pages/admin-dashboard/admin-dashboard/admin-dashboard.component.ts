import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { DashboardStats } from '../../../models/DashboardStats';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
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

  constructor(private router: Router){}

  ngOnInit() {
    this.loadMockData();
  }

   loadMockData(): void {
    this.stats = {
      totalJobs: 128,
      totalEmployers: 42,
      totalCandidates: 560,
      totalApplications: 1340,
      pendingApprovals: 7
    };

    this.recentActivity = [
      'New employer "TechSoft Ltd" registered',
      'Candidate John Doe applied for "Frontend Developer"',
      'Job post "Marketing Specialist" approved',
      'Candidate Jane Smith account suspended',
      'Employer "CreativeHub" pending verification'
    ];
  }

  goTo(page: string) {
    this.router.navigateByUrl(page);
    console.log(`Navigate to ${page}`);
  }

}
