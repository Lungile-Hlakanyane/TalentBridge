import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Application } from '../../../models/Application';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss'
})
export class ApplicationsComponent implements OnInit {

  applications: Application[] = [];

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.loadMockApplications();
  }

  loadMockApplications(): void {
    this.applications = [
      {
        candidateId: 1,
        candidateName: 'Alice Johnson',
        position: 'Frontend Developer',
        company: 'TechSoft Ltd',
        appliedDate: new Date('2025-08-15T10:30:00'),
        id: 0,
        jobTitle: '',
        status: 'Pending'
      },
      {
        candidateId: 2,
        candidateName: 'Bob Smith',
        position: 'Backend Developer',
        company: 'CreativeHub',
        appliedDate: new Date('2025-08-16T14:45:00'),
        id: 0,
        jobTitle: '',
        status: 'Pending'
      },
      {
        candidateId: 3,
        candidateName: 'Clara Lee',
        position: 'Data Analyst',
        company: 'DataWorks',
        appliedDate: new Date('2025-08-17T09:15:00'),
        id: 0,
        jobTitle: '',
        status: 'Pending'
      }
    ];
  }

  viewApplicantProfile(candidateId: number): void {
    this.router.navigate([`/admin/candidate-details/${candidateId}`]);
  }

  goTo(path: string): void {
    this.router.navigate([`/admin/${path}`]);
  }

  goBack() {
    this.location.back();
  }

}
