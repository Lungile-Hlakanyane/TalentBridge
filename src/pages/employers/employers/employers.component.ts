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
  modalAction: 'approve' | 'reject' | 'suspend' | 'unsuspend' | 'delete' | null = null;
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
  confirmAction(employer: Employer, action: 'approve' | 'reject' | 'suspend' | 'unsuspend' | 'delete') {
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
  this.userService.suspendAccount(id, 30).subscribe({
    next: (response) => {
      console.log(response);
      this.updateStatus(id, 'suspended');
    },
    error: (err) => console.error('Failed to suspend employer:', err)
  });
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
        this.closeModal();
        break;
        
      case 'reject':
        this.updateStatus(this.selectedEmployer.id, 'rejected');
        this.closeModal();
        break;
        
      case 'suspend':
        this.userService.suspendAccount(this.selectedEmployer.id, 30).subscribe({
          next: (response) => {
            console.log(response);
            this.updateStatus(this.selectedEmployer.id, 'suspended');
            this.selectedEmployer.suspensionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
            this.closeModal();
          },
          error: (err) => console.error('Failed to suspend employer:', err)
        });
        break;

      case 'unsuspend':
        this.userService.unsuspendAccount(this.selectedEmployer.id).subscribe({
          next: (response) => {
            console.log(response);
            this.selectedEmployer.suspended = false;
            this.selectedEmployer.suspensionExpiry = null;
            this.updateStatus(this.selectedEmployer.id, 'approved');
            this.closeModal();
          },
          error: (err) => console.error('Failed to unsuspend employer:', err)
        });
        break;
        
      case 'delete':
        this.userService.deleteAccount(this.selectedEmployer.id).subscribe({
          next: (response) => {
            console.log(response);
            this.employers = this.employers.filter(emp => emp.id !== this.selectedEmployer.id);
            this.filteredEmployers = this.filteredEmployers.filter(emp => emp.id !== this.selectedEmployer.id);
            this.closeModal();
          },
          error: (err) => console.error('Failed to delete employer:', err)
        });
        break;
    }
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

  calculateDaysLeft(suspensionExpiry: string): number {
   const expiryDate = new Date(suspensionExpiry);
   const currentDate = new Date();
   const timeDifference = expiryDate.getTime() - currentDate.getTime();
   const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
   return daysLeft;
  }

}
