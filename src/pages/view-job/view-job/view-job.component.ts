import { Component, OnInit } from '@angular/core';
import { Job } from '../../../models/Job';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-job',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-job.component.html',
  styleUrl: './view-job.component.scss'
})
export class ViewJobComponent implements OnInit{

  job: Job | undefined;
  jobs: Job[] = [];

  showModal: boolean = false;
  selectedFile: File | null = null;

  constructor(
   private route:ActivatedRoute,
   private router: Router
  ){}

  application = {
    name: '',
    email: '',
    coverLetter: ''
  };

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

   onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

   submitApplication() {
    console.log('Applying to job:', this.job);
    console.log('Application Info:', this.application);
    console.log('Uploaded Resume:', this.selectedFile);

    alert(`Application submitted for "${this.job?.title}" at ${this.job?.company}`);
    this.closeModal();
  }

  ngOnInit(){
    this.jobs = [
      { id: 1, title: 'Frontend Developer', company: 'Tech Solutions', location: 'Johannesburg', type: 'Full-time', description: 'Work on building amazing web apps.', requirements: ['HTML, CSS, JS', 'Angular experience', 'Team player'] },
      { id: 2, title: 'Backend Developer', company: 'Innovate Inc', location: 'Cape Town', type: 'Contract', description: 'Develop APIs and services.', requirements: ['Node.js, Express', 'Database experience', 'Problem-solving skills'] },
      { id: 3, title: 'UI/UX Designer', company: 'Creative Minds', location: 'Remote', type: 'Part-time', description: 'Design beautiful interfaces.', requirements: ['Figma, Adobe XD', 'Creativity', 'Attention to detail'] }
    ];
    const jobId = Number(this.route.snapshot.paramMap.get('id'));
    this.job = this.jobs.find(j => j.id === jobId);
  }

  goBack() {
    this.router.navigate(['/']);
  }

  applyJob() {
    console.log('Applying to job:', this.job);
    alert(`You have applied to "${this.job?.title}" at ${this.job?.company}`);
  }

}
