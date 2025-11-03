import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '../../../models/Job';
import { Candidate } from '../../../models/Candidate';
import { Resume } from '../../../models/Resume';
import { Location } from '@angular/common';

@Component({
  selector: 'app-candidate-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidate-details.component.html',
  styleUrl: './candidate-details.component.scss'
})
export class CandidateDetailsComponent implements OnInit{

  candidate!: Candidate;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location:Location
  ) { }

  ngOnInit(): void {
    this.loadMockCandidate(1);
  }

   loadMockCandidate(id: number): void {
    this.candidate = {
      id,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phoneNumber: '+27 123 456 789',
      location: 'Cape Town, SA',
      status: 'active',
      registeredDate: new Date('2025-02-10'),
      resumes: [
        { name: 'Resume_2025.pdf', url: '#' },
        { name: 'Portfolio.pdf', url: '#' }
      ],
      appliedJobs: [
        { id: 1, title: 'Frontend Developer', company: 'TechSoft Ltd', location: 'Cape Town', status: 'approved' },
        { id: 2, title: 'Backend Developer', company: 'CreativeHub', location: 'Remote', status: 'pending' }
      ],
      appliedFor: '' 
    };
  }

  downloadResume(url: string) {
    window.open(url, '_blank');
  }

  viewJobDetails(jobId: number) {
    this.router.navigate([`/admin/job-details/${jobId}`]);
  }

  goTo(path: string) {
    this.router.navigate([`/admin/${path}`]);
  }

  goBack() {
    this.location.back();
  }

}
