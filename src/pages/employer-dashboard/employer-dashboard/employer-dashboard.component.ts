import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employer-dashboard.component.html',
  styleUrl: './employer-dashboard.component.scss'
})
export class EmployerDashboardComponent implements OnInit{

  constructor(private router: Router){}

  ngOnInit() {}

  employerName = 'ABC Recruitment Agency';

  activeJobs = [
    { id: 1, title: 'Frontend Developer', location: 'Johannesburg', applicants: 12 },
    { id: 2, title: 'Backend Engineer', location: 'Cape Town', applicants: 8 },
    { id: 3, title: 'Project Manager', location: 'Durban', applicants: 5 }
  ];

  insights = {
    jobsPosted: 15,
    totalApplicants: 120,
    interviews: 20
  };

  goTo(page: string) {
    this.router.navigateByUrl(page);
    console.log(`Navigate to ${page}`);
  }

  manageJob(id: number) {
    this.router.navigate(['/manage-job', id]);
    console.log(`Managing job with ID: ${id}`);
  }

}
