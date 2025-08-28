import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.scss'
})
export class PostJobComponent implements OnInit{

  job = {
    title: '',
    company: '',
    location: '',
    type: '',
    description: '',
    requirements: '',
    salary: ''
  };

  constructor(
    private router: Router
  ){}

  ngOnInit(){}

  submitJob() {
    if (!this.job.title || !this.job.company || !this.job.location) {
      alert('Please fill in all required fields.');
      return;
    }
    let jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    jobs.push(this.job);
    localStorage.setItem('jobs', JSON.stringify(jobs));
    alert('Job posted successfully!');
    this.router.navigate(['/employer-dashboard']);
  }

  cancel() {
    this.router.navigate(['/employer-dashboard']);
  }
  
}
