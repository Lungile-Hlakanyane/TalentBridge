import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { UserService } from '../../../services/User-Service/user.service';
import { JobService } from '../../../services/Job-Service/job.service';
import { ApplicationService } from '../../../services/Application-Service/application.service';
import { LoadingService } from '../../../services/Loading-Service/loading.service';
import { LoadingSpinnerComponent } from '../../../re-usable-components/loading-spinner/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [CommonModule, NgChartsModule, LoadingSpinnerComponent],
  templateUrl: './admin-analytics.component.html',
  styleUrl: './admin-analytics.component.scss'
})
export class AdminAnalyticsComponent implements OnInit{

  stats: { label: string, value: number }[] = [];

  insights = {
    employers: 0,
    candidates: 0,
    jobs: 0,
    applications: 0,
    offers: 0
  };

  constructor(
    private location:Location,
    private router:Router,
    private userService:UserService,
    private jobService:JobService,
    private applicationService:ApplicationService,
    private loading:LoadingService
  ){}

  ngOnInit(): void {
    this.loadInsights();
  }

  goBack(){
    this.location.back();
  }

  navigate(link:string){
    this.router.navigateByUrl(link);
  }

   pieChartLabels = ['Employers', 'Candidates', 'Jobs', 'Applications', 'Offers'];
    pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Employers', 'Candidates', 'Jobs', 'Applications', 'Offers'],
    datasets: [{
      data: [
        this.insights.employers,
        this.insights.candidates,
        this.insights.jobs,
        this.insights.applications,
        this.insights.offers
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

  loadInsights() {
    this.loading.show();  //show loading spinner
    this.userService.getEmployerCount().subscribe({
      next: (count) => {
        this.insights.employers = count;
        this.updateStatsAndChart();
      },
      error: (err) => console.error('Error fetching employer count:', err),
      complete: () => this.loading.hide()
    });
    this.loading.show();//show loading spinner
    this.userService.getEmployeeCount().subscribe({
      next: (count) => {
        this.insights.candidates = count;
        this.updateStatsAndChart();
      },
      error: (err) => console.error('Error fetching candidate count:', err),
      complete: () => this.loading.hide()
    });
    this.loading.show();//show loading spinner
    this.jobService.getJobCount().subscribe({
     next: (count) => {
      this.insights.jobs = count;
      this.updateStatsAndChart();
     },
     error: (err) => console.error('Error fetching job count:', err),
     complete: () => this.loading.hide()
    });
    this.loading.show();//show loading spinner
    this.applicationService.getApplicationCount().subscribe({
      next:(count)=>{
        this.insights.applications=count;
        this.updateStatsAndChart();
      },
      error:(err)=>console.error('Error fetching application count:',err),
      complete: () => this.loading.hide()
    });
  }

  updateStatsAndChart() {
  this.stats = [
    { label: 'Employers', value: this.insights.employers },
    { label: 'Candidates', value: this.insights.candidates },
    { label: 'Jobs', value: this.insights.jobs },
    { label: 'Applications', value: this.insights.applications },
    { label: 'Offers', value: this.insights.offers }
  ];
  this.pieChartData = {
    labels: ['Employers', 'Candidates', 'Jobs', 'Applications', 'Offers'],
    datasets: [{
      data: [
        this.insights.employers,
        this.insights.candidates,
        this.insights.jobs,
        this.insights.applications,
        this.insights.offers
      ],
      backgroundColor: ['#2b90d9', '#6fb1fc', '#74c69d', '#f6bd60', '#f28482'],
      borderColor: '#fff',
      borderWidth: 2
    }]
  };
}



}
