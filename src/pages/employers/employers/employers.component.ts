import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Employer } from '../../../models/Employer';
import { Location } from '@angular/common';
import { UserService } from '../../../services/User-Service/user.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-employers',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employers.component.html',
  styleUrl: './employers.component.scss'
})
export class EmployersComponent implements OnInit {

  employers: Employer[] = [];
  filteredEmployers: Employer[] = [];
  searchTerm: string = '';

   // Modal state
  showModal = false;
  modalAction: 'approve' | 'reject' | 'suspend' | 'delete' | null = null;
  selectedEmployer!: Employer;
  
  constructor(
    private router:Router,
    private location: Location,
    private userService:UserService
  ) { }

  ngOnInit(): void {
        this.userService.getAllEmployers().subscribe({
            next: (employers) => {
                this.employers = employers;
                this.filteredEmployers = employers;
            },
            error: (err) => console.error('Failed to load employers:', err)
        });
    }


  // Open confirmation modal
  confirmAction(employer: Employer, action: 'approve' | 'reject' | 'suspend' | 'delete') {
    this.selectedEmployer = employer;
    this.modalAction = action;
    this.showModal = true;
  }

   approveEmployer(id: number): void {
    this.updateStatus(id, 'approved');
  }

  rejectEmployer(id: number): void {
    this.updateStatus(id, 'rejected');
  }

  suspendEmployer(id: number): void {
    this.updateStatus(id, 'suspended');
  }

  deleteEmployer(id: number): void {
    this.employers = this.employers.filter(emp => emp.id !== id);
    alert(`Employer deleted successfully`);
  }

  private updateStatus(id: number, newStatus: Employer['status']): void {
    const employer = this.employers.find(emp => emp.id === id);
    if (employer) {
      employer.status = newStatus;
    }
  }

  goTo(path: string): void {
    this.router.navigate([`path`]);
  }

  navigate(link: string){
    this.router.navigateByUrl(link);
  }

   // Execute action after confirming
  executeAction() {
    if (!this.selectedEmployer || !this.modalAction) return;

    switch (this.modalAction) {
      case 'approve':
        this.updateStatus(this.selectedEmployer.id, 'approved');
        break;
      case 'reject':
        this.updateStatus(this.selectedEmployer.id, 'rejected');
        break;
      case 'suspend':
        this.updateStatus(this.selectedEmployer.id, 'suspended');
        break;
      case 'delete':
        this.employers = this.employers.filter(emp => emp.id !== this.selectedEmployer.id);
        break;
    }
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.modalAction = null;
  }

  
  goBack() {
    this.location.back();
  }

   searchEmployers(): void {
        this.filteredEmployers = this.employers.filter((employer) =>
            employer.companyName.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

}
