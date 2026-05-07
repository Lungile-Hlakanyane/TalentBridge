import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InterviewDTO } from '../../../models/InterviewDTO';
import { InterviewService } from '../../../services/interview-service/interview.service';
import { UserService } from '../../../services/User-Service/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './interviews.component.html',
  styleUrl: './interviews.component.scss'
})
export class InterviewsComponent implements OnInit{

  interviews: InterviewDTO[] = [];
  filteredInterviews: InterviewDTO[] = [];
  companyName!: string;
  searchEmail: string = '';
  userRole: string | null = null;
  showCancelModal = false;
  selectedInterview: any = null;

  constructor(
    private router: Router,
    private interviewService:InterviewService,
    private userService:UserService
  ){}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role'); //fetching role from the local storage
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
        this.filteredInterviews = interviews;
      }, error => {
        console.error('Error fetching interviews:', error);
      });
  }

  goBack() {
    this.router.navigate(['/employer-dashboard']);
  }

  searchInterviews() {
    if (this.searchEmail) {
      this.filteredInterviews = this.interviews.filter(interview =>
        interview.interviewee.toLowerCase().includes(this.searchEmail.toLowerCase())
      );
    } else {
      this.filteredInterviews = this.interviews;
    }
  }

  openCancelModal(interview:any){
    this.selectedInterview = interview;
    this.showCancelModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeCancelModal(){
    this.showCancelModal = false;
    this.selectedInterview = null;
    document.body.style.overflow = 'auto';
  }

confirmCancel(){
    if(!this.selectedInterview) return;
     this.interviewService.deleteInterview(this.selectedInterview.id).subscribe({
      next: () => {
        this.interviews = this.interviews.filter(
          i => i.id!== this.selectedInterview.id
        );
        this.closeCancelModal();
      },
      error: (err) => {
        console.error('Error cancelling interview:', err);
        this.closeCancelModal();
      }
    });
  }

}
