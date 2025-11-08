import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ApplicationService } from '../../../services/Application-Service/application.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/User-Service/user.service';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.scss'
})
export class ViewProfileComponent implements OnInit{

  candidate: any = null;
  isLoading = true;
  atsResult: any = null;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private userService:UserService
  ){}

  ngOnInit(){
    this.loadCandidateDetails();  
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

  loadCandidateDetails() {
    const applicantId = this.route.snapshot.paramMap.get('id');
    if (!applicantId) return;
    this.applicationService.getApplicationById(Number(applicantId)).subscribe({
      next: (data) => {
        this.candidate = {
          id: data.id,
          name: data.applicantName,
          email: data.applicantEmail,
          phone: 'N/A', 
          appliedFor: data.jobTitle || 'N/A',
          experience: data.experience || 'N/A',
          education: data.education || 'N/A',
          skills: data.skills || 'N/A',
          summary: data.coverLetter || 'N/A',
        };
        this.userService.getUserByEmail(data.applicantEmail).subscribe({
          next: (user) => {
            this.candidate.phone = user.phone || 'N/A';
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error fetching user by email:', err);
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error loading application:', err);
        this.isLoading = false;
      }
    });
  }

}
