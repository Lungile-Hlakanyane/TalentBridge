import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { InterviewService } from '../../../services/interview-service/interview.service';
import { InterviewDTO } from '../../../models/InterviewDTO';
import { UserService } from '../../../services/User-Service/user.service';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-interviews',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './employee-interviews.component.html',
  styleUrl: './employee-interviews.component.scss'
})
export class EmployeeInterviewsComponent implements OnInit {

  interviews: any[] = [];
  currentUserEmail = '';
  showCancelModal = false;
  selectedInterview: any = null;
  allInterviews: any[] = []; 
  searchTerm = '';

  constructor(
    private router:Router,
    private interviewService:InterviewService,
    private userService:UserService,
    private datePipe: DatePipe
  ){}

  ngOnInit(): void {
    this.currentUserEmail = localStorage.getItem('email') || '';
    if (this.currentUserEmail) {
      this.loadInterviews(this.currentUserEmail);
    }
  }

   loadInterviews(email: string) {
    this.interviewService.getInterviewsByEmail(email).pipe(
      switchMap((interviews: InterviewDTO[]) => {
        if (!interviews.length) return of([]);
        const requests = interviews.map(interview =>
          this.userService.getUserById(interview.userId).pipe(
            map((employer: any) => ({
          ...interview,
              interviewType: this.mapInterviewType(interview.type),
              employerEmail: employer.email || 'Not provided',
              phoneNumber: employer.phone || 'Not provided',
              employerName: `${employer.name} ${employer.surname}`,
              employerCompany: employer.company_name
            })),
            catchError(err => {
              console.warn(`Employer ${interview.userId} not found:`, err);
              return of({
            ...interview,
                interviewType: this.mapInterviewType(interview.type),
                employerEmail: 'Not provided',
                phoneNumber: 'Not provided',
                employerName: 'Unknown',
                employerCompany: interview.companyName
              });
            })
          )
        );
        return forkJoin(requests);
      })
    ).subscribe({
      next: (interviewsWithEmployer) => {
        this.allInterviews = interviewsWithEmployer; 
        this.interviews = interviewsWithEmployer;
      },
      error: (err) => console.error('Error fetching interviews:', err)
    });
  }

  filterInterviews() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.interviews = this.allInterviews;
      return;
    }
    this.interviews = this.allInterviews.filter(interview => {
      const dateStr = this.datePipe.transform(interview.date, 'fullDate')?.toLowerCase() || '';
      const shortDate = this.datePipe.transform(interview.date, 'mediumDate')?.toLowerCase() || '';
      return (
        interview.companyName?.toLowerCase().includes(term) ||
        interview.employerName?.toLowerCase().includes(term) ||
        interview.employerEmail?.toLowerCase().includes(term) ||
        interview.platform?.toLowerCase().includes(term) ||
        interview.interviewType?.toLowerCase().includes(term) ||
        interview.location?.toLowerCase().includes(term) ||
        dateStr.includes(term) ||
        shortDate.includes(term)
      );
    });
  }

  clearSearch() {
    this.searchTerm = '';
    this.filterInterviews();
  }

  mapInterviewType(type: number | string): string {
  const typeMap: any = {
    0: 'VIRTUAL', 
    1: 'IN_PERSON',
    2: 'TECHNICAL',
    'VIRTUAL': 'VIRTUAL',
    'IN_PERSON': 'IN_PERSON'
  };
  return typeMap[type] || 'Unknown';
}

  goBack(){
    this.router.navigateByUrl('/')
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
