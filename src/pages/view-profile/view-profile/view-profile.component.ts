import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.scss'
})
export class ViewProfileComponent implements OnInit{

  candidate = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    appliedFor: 'Frontend Developer',
    experience: '3 years',
    education: 'BSc Computer Science',
    skills: 'Angular, TypeScript, HTML, CSS',
    summary: 'Passionate frontend developer with a strong eye for UI/UX design...'
  };

  atsResult: any = null;
  constructor(
    private location: Location,
    private router: Router
  ){}

  ngOnInit(){
    
  }
  
  goBack(){
    this.location.back();
  }

   runAtsMatch(candidate: any) {
    this.atsResult = {
      score: 82,
      strengths: [
        'Strong Angular & TypeScript skills',
        'Relevant frontend development experience',
        'Good understanding of UI/UX'
      ],
      gaps: [
        'Limited exposure to backend technologies',
        'Needs more experience with cloud deployments'
      ]
    };
  }

  proceedToStage(){
    this.router.navigateByUrl('/stages');
  }

}
