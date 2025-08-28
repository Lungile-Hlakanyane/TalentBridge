import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from '../../../models/Application';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-applications.component.html',
  styleUrl: './my-applications.component.scss'
})
export class MyApplicationsComponent implements OnInit {

  applications: Application[] = [];

  constructor(
    private router:Router
  ){}

  ngOnInit() {
     this.applications = [
      { id: 1, jobTitle: 'Frontend Developer', company: 'Tech Solutions', status: 'Pending', appliedDate: new Date('2025-08-01') },
      { id: 2, jobTitle: 'Backend Developer', company: 'Innovate Inc', status: 'Accepted', appliedDate: new Date('2025-07-25') },
      { id: 3, jobTitle: 'UI/UX Designer', company: 'Creative Minds', status: 'Rejected', appliedDate: new Date('2025-07-30') },
      { id: 4, jobTitle: 'Data Analyst', company: 'DataWorks', status: 'Pending', appliedDate: new Date('2025-08-05') },
      { id: 5, jobTitle: 'Full Stack Developer', company: 'NextGen Software', status: 'Accepted', appliedDate: new Date('2025-08-03') },
      { id: 6, jobTitle: 'Project Manager', company: 'Visionary Projects', status: 'Pending', appliedDate: new Date('2025-08-07') }
    ];
  }

  goBack() {
    this.router.navigateByUrl('/');
  }

  viewApplication(id: number) {
    console.log('Viewing application with ID:', id);
  }

  browseJobs(link:string){
    this.router.navigateByUrl(link);
  }

}
