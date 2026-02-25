import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InterviewDTO } from '../../../models/InterviewDTO';
import { InterviewService } from '../../../services/interview-service/interview.service';
import { UserService } from '../../../services/User-Service/user.service';

@Component({
  selector: 'app-interviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interviews.component.html',
  styleUrl: './interviews.component.scss'
})
export class InterviewsComponent implements OnInit{

  interviews: InterviewDTO[] = [];
  companyName!: string;

  constructor(
    private router: Router,
    private interviewService:InterviewService,
    private userService:UserService
  ){}

 ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));
    this.userService.getUserById(userId)
      .subscribe(user => {
        this.companyName = user.companyName;
      }, error => {
        console.error('Error fetching user data:', error);
      });
    this.interviewService.getInterviewsByUserId(userId)
      .subscribe(interviews => {
        this.interviews = interviews;
      }, error => {
        console.error('Error fetching interviews:', error);
      });
  }

  goBack() {
    this.router.navigate(['/employer-dashboard']);
  }

}
