import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidate } from '../../../models/Candidate';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { UserService } from '../../../services/User-Service/user.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-candidate-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './candidate-management.component.html',
  styleUrl: './candidate-management.component.scss'
})
export class CandidateManagementComponent implements OnInit {
  searchTerm: string = '';
  candidates: Candidate[] = [];
  selectedFilter: 'all' | 'active' | 'suspended' | 'flagged' = 'all';

  showModal = false;
  modalAction: 'approve' | 'reject' | 'suspend' | 'unsuspend' | 'delete' | null = null;
  selectedCandidate!: Candidate;

  constructor(
    private router: Router,
    private location: Location,
    private usersService:UserService  
  ) { } 

  ngOnInit(): void {
    this.usersService.getAllEmployees().subscribe({
        next: (employees) => {
            this.candidates = employees;
        },
        error: (err) => console.error('Failed to load employees:', err)
    });
}

  setFilter(filter: 'all' | 'active' | 'suspended' | 'flagged') {
    this.selectedFilter = filter;
  }


confirmAction(candidate: Candidate, action: 'approve' | 'reject' | 'suspend' | 'unsuspend' | 'delete') {
    this.selectedCandidate = candidate;
    this.modalAction = action;
    this.showModal = true;
  }

  executeAction() {
    if (!this.selectedCandidate ||!this.modalAction) return;
    switch (this.modalAction) {
      case 'suspend':
        this.usersService.suspendAccount(this.selectedCandidate.id, 30).subscribe({
          next: (response) => {
            this.selectedCandidate.status = 'suspended';
            this.selectedCandidate.suspended = true;
            this.selectedCandidate.suspensionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
            this.closeModal();
          },
          error: (err) => console.error('Failed to suspend candidate:', err)
        });
        break;
      case 'unsuspend':
        this.usersService.unsuspendAccount(this.selectedCandidate.id).subscribe({
          next: (response) => {
            this.selectedCandidate.status = 'active';
            this.selectedCandidate.suspended = false;
            this.selectedCandidate.suspensionExpiry = null;
            this.closeModal();
          },
          error: (err) => console.error('Failed to unsuspend candidate:', err)
        });
        break;
      case 'delete':
        this.usersService.deleteAccount(this.selectedCandidate.id).subscribe({
          next: (response) => {
            this.candidates = this.candidates.filter(c => c.id!== this.selectedCandidate.id);
            this.closeModal();
          },
          error: (err) => console.error('Failed to delete candidate:', err)
        });
        break;
      case 'approve':
        this.selectedCandidate.status = 'active';
        this.selectedCandidate.suspended = false;
        this.closeModal();
        break;
      case 'reject':
        this.selectedCandidate.status = 'rejected';
        this.closeModal();
        break;
    }
  }


  closeModal() {
    this.showModal = false;
    this.modalAction = null;
  }

  goTo(path: string) {
    this.router.navigate([`/admin/${path}`]);
  }

  navigate(link: string){
    this.router.navigate([link]);
  }

  goBack() {
    this.location.back();
  }

  filteredCandidates() {
    return this.candidates.filter(candidate => 
        candidate.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

   calculateDaysLeft(suspensionExpiry: string): number {
    if (!suspensionExpiry) return 0;
    const expiryDate = new Date(suspensionExpiry);
    const currentDate = new Date();
    const timeDifference = expiryDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysLeft > 0? daysLeft : 0;
  }

}
