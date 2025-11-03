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
  modalAction: 'suspend' | 'delete' | null = null;
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

  filteredCandidates() {
    return this.candidates.filter(candidate => 
        candidate.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
