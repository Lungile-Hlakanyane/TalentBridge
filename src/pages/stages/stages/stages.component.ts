import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../models/Candidate';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';
import { FormGroup, FormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InterviewService } from '../../../services/interview-service/interview.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/User-Service/user.service';
import { InterviewDTO } from '../../../models/InterviewDTO';
import { InterviewType } from '../../../enums/InterviewType';
import { LoadingService } from '../../../services/Loading-Service/loading.service';
import { LoadingSpinnerComponent } from '../../../re-usable-components/loading-spinner/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-stages',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule, ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './stages.component.html',
  styleUrl: './stages.component.scss'
})
export class StagesComponent implements OnInit{

  companyName!: string;
  showInterviewModal = false;
  loading = false;

  interviewForm = new FormGroup({
    date: new FormControl(''),
    time: new FormControl(''),
    type: new FormControl('VIRTUAL'),
    platform: new FormControl(''),
    location: new FormControl('')
  });

 stages = [
    { name: 'Interview', candidates: [] as Candidate[] },
    { name: 'Background Check', candidates: [] as Candidate[] },
    { name: 'Decline', candidates: [] as Candidate[] },
    { name: 'Letter Offered', candidates: [] as Candidate[] }
  ];

  stageIds: string[] = [];
  showModal = false;
  newStageName = '';
  applicant: any;

  constructor(
    private route:ActivatedRoute,
    private location: Location,
    private http:HttpClient,
    private interviewService:InterviewService,
    private userService:UserService,
    private loadingService:LoadingService
  ) {
  }

  ngOnInit() {

  this.loadingService.loading$.subscribe(loading => {
    this.loading = loading;
  });

  const userId = Number(localStorage.getItem('userId'));
  this.userService.getUserById(userId)
    .subscribe(response => {
      this.companyName = response.companyName;
    }, error => {
      console.error('Error getting company name:', error);
    });

  this.applicant = history.state.applicant;
  if (this.applicant) {
    this.stages[0].candidates.push({
      id: this.applicant.id,
      name: this.applicant.applicantName,
      email: this.applicant.applicantEmail,
      appliedFor: this.applicant.appliedFor
    });
    this.updateStageIds();
  } else {
  }
}


  drop(event: CdkDragDrop<Candidate[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  goBack(){
    this.location.back();
  }

  private updateStageIds() {
    this.stageIds = this.stages.map((_, i) => `stage-${i}`);
  }

  createStage() {
    const stageName = prompt('Enter new stage name:');
    if (stageName && stageName.trim()) {
      this.stages.push({ name: stageName.trim(), candidates: [] });
      this.updateStageIds();
    }
  }

  openModal() {
    this.newStageName = '';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveStage() {
    if (this.newStageName.trim()) {
      this.stages.push({ name: this.newStageName.trim(), candidates: [] });
      this.updateStageIds();
      this.closeModal();
    }
  }


 proceedToBackgroundCheck() {
  const candidate = this.stages[1].candidates[0];
  if (confirm(`Are you sure you want to proceed with the background check for ${candidate.name}?`)) {
    this.interviewService.sendBackgroundCheckEmail(candidate.email)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.error('Error sending background check email:', error);
      });
  }
}

declineCandidate() {
  const candidate = this.stages[2].candidates[0];
  if (confirm(`Are you sure you want to decline ${candidate.name}?`)) {
    this.interviewService.declineCandidate(candidate.email)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.error('Error declining candidate:', error);
      });
  }
}

sendOffer() {
  const candidate = this.stages[3].candidates[0];
  if (confirm(`Are you sure you want to send an offer to ${candidate.name}?`)) {
    this.interviewService.sendOfferEmail(candidate.email)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.error('Error sending offer email:', error);
      });
  }
}

  onTypeChange(type: string) {
    if (type === 'VIRTUAL') {
      this.interviewForm.get('platform')?.setValue('');
      this.interviewForm.get('location')?.setValue('');
    } else if (type === 'FACE_TO_FACE') {
      this.interviewForm.get('platform')?.setValue('');
    }
  }

scheduleInterview() {
  if (!this.applicant || !this.applicant.applicantEmail) {
    console.error('Applicant email is not available');
    return;
  }

  const interview: InterviewDTO = {
    userId: Number(localStorage.getItem('userId')),
    type: this.interviewForm.get('type')!.value as InterviewType,
    location: this.interviewForm.get('location')!.value ?? '',
    platform: this.interviewForm.get('platform')!.value ?? '',
    companyName: this.companyName,
    interviewee: this.applicant.applicantEmail,
    date: this.interviewForm.get('date')!.value, //check if this value is captured on DB
    time: this.interviewForm.get('time')!.value, //check if this value is captured on DB
  };

  this.loadingService.show();
  this.interviewService.createInterview(interview)
    .subscribe(response => {
      this.closeInterviewModal();
      this.loadingService.hide();
      console.log('Interview created successfully:', response);
      alert('Interview successfully created!...');
    }, error => {
      this.loadingService.hide();
      alert('Error creating Interview, try again...')
      console.error('Error creating interview:', error);
    });
}

closeInterviewModal() {
    this.showInterviewModal = false;
}

 proceed() {
  const currentStage = this.stages.find(stage => stage.candidates.length > 0);
  if (currentStage) {
    switch (currentStage.name) {
      case 'Interview':
        this.proceedToInterview();
        break;
      case 'Background Check':
        this.proceedToBackgroundCheck();
        break;
      case 'Decline':
        this.declineCandidate();
        break;
      case 'Letter Offered':
        this.sendOffer();
        break;
      default:
        console.log('No action defined for this stage');
    }
  }
}

proceedToInterview() {
  this.showInterviewModal = true;
}

//schdeule interview method
 

}
