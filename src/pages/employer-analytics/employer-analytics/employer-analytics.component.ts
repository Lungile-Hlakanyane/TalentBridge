import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { UserService } from '../../../services/User-Service/user.service';
import { JobService } from '../../../services/Job-Service/job.service';
import { Job } from '../../../models/Job';

@Component({
  selector: 'app-employer-analytics',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './employer-analytics.component.html',
  styleUrls: ['./employer-analytics.component.scss']
})
export class EmployerAnalyticsComponent implements OnInit {

  employerName: string = '';
  stats: { label: string, value: number }[] = [];

  constructor(
    private location: Location,
    private router: Router,
    private userService: UserService,
    private jobService: JobService,
  ){}

  activeJobs: Job[] = [];

  insights = {
    jobsPosted: 0,
    applications: 0,
    interviews: 10,
    jobOffers: 1,
    rejections: 9
  };


  goBack(){
    this.location.back();
  }

  ngOnInit(){
    this.loadEmployerName();
    this.loadActiveJobs();
  }

  pieChartLabels = ['Jobs', 'Applications', 'Interviews', 'Offers', 'Rejections'];
  pieChartData: ChartConfiguration<'pie'>['data'] = {
  labels: ['Jobs', 'Applications', 'Interviews', 'Offers', 'Rejections'],
  datasets: [{
    data: [
      this.insights.jobsPosted,
      this.insights.applications,
      this.insights.interviews,
      this.insights.jobOffers,
      this.insights.rejections
    ],
    backgroundColor: ['#2b90d9', '#6fb1fc', '#74c69d', '#f6bd60', '#f28482'],
    borderColor: '#fff',
    borderWidth: 2
  }]
};

  pieChartType: ChartConfiguration<'pie'>['type'] = 'pie';
  pieChartPlugins = [];
  pieChartColors = [
    {
      backgroundColor: ['#2b90d9', '#6fb1fc', '#74c69d', '#f6bd60', '#f28482'],
    },
  ];
  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 13,
          },
        },
      },
    },
  };

  goTo(page: string) {
    this.router.navigateByUrl(page);
    console.log(`Navigate to ${page}`);
  }

   /** Load employer company name from backend */
  loadEmployerName() {
    const userId = localStorage.getItem('userId'); // get logged-in userId
    if (userId) {
      this.userService.getUserById(Number(userId)).subscribe({
        next: (user) => {
          if (user && user.companyName) {
            this.employerName = user.companyName;
          } else {
            this.employerName = 'Your Company'; // fallback
          }
        },
        error: (err) => {
          console.error('Error fetching user details:', err);
          this.employerName = 'Your Company';
        }
      });
    } else {
      this.employerName = 'Your Company';
      console.warn('No userId found in localStorage');
    }
  }

 loadActiveJobs() {
  const userId = localStorage.getItem('userId');
  if (userId) {
    this.jobService.getJobsByUserId(Number(userId)).subscribe({
      next: (jobs) => {
        this.activeJobs = jobs.sort(
          (a, b) => new Date(b.created ?? 0).getTime() - new Date(a.created ?? 0).getTime()
        );
        this.insights.jobsPosted = this.activeJobs.length;
        this.insights.applications = this.activeJobs.reduce(
          (sum, job) => sum + (job.applications || 0),
          0
        );
        this.updateChartData();
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
      }
    });
  } else {
    console.warn('No userId found in localStorage');
  }
}


updateChartData() {
  this.pieChartData.datasets[0].data = [
    this.insights.jobsPosted,
    this.insights.applications,
    this.insights.interviews,
    this.insights.jobOffers,
    this.insights.rejections
  ];
  this.updateStats();
}

updateStats() {
  this.stats = [
    { label: 'Jobs Posted', value: this.insights.jobsPosted },
    { label: 'Applications', value: this.insights.applications },
    { label: 'Interviews', value: this.insights.interviews },
    { label: 'Job Offers', value: this.insights.jobOffers },
    { label: 'Rejections', value: this.insights.rejections }
  ];
}

}
