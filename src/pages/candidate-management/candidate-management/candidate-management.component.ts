import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidate } from '../../../models/Candidate';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-candidate-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidate-management.component.html',
  styleUrl: './candidate-management.component.scss'
})
export class CandidateManagementComponent implements OnInit {

  candidates: Candidate[] = [];
  selectedFilter: 'all' | 'active' | 'suspended' | 'flagged' = 'all';

  showModal = false;
  modalAction: 'suspend' | 'delete' | null = null;
  selectedCandidate!: Candidate;

  constructor(
    private router: Router,
    private location: Location  
  ) { } 

  ngOnInit(): void {
      this.candidates = [
      {
        id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'active',
        appliedFor: ''
      },
      {
        id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'suspended',
        appliedFor: ''
      },
      {
        id: 3, name: 'Charlie Brown', email: 'charlie@example.com', status: 'flagged',
        appliedFor: ''
      },
      {
        id: 4, name: 'Diana Prince', email: 'diana@example.com', status: 'active',
        appliedFor: ''
      }
    ];
  }

  setFilter(filter: 'all' | 'active' | 'suspended' | 'flagged') {
    this.selectedFilter = filter;
  }

  filteredCandidates(): Candidate[] {
    if (this.selectedFilter === 'all') return this.candidates;
    return this.candidates.filter(c => c.status === this.selectedFilter);
  }

  confirmAction(candidate: Candidate, action: 'suspend' | 'delete') {
    this.selectedCandidate = candidate;
    this.modalAction = action;
    this.showModal = true;
  }

  executeAction() {
    if (!this.selectedCandidate || !this.modalAction) return;

    if (this.modalAction === 'suspend') {
      this.selectedCandidate.status = 'suspended';
    } else if (this.modalAction === 'delete') {
      this.candidates = this.candidates.filter(c => c.id !== this.selectedCandidate.id);
    }

    this.closeModal();
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

}
