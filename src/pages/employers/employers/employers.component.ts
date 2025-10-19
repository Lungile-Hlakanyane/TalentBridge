import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Employer } from '../../../models/Employer';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employers.component.html',
  styleUrl: './employers.component.scss'
})
export class EmployersComponent implements OnInit {

  employers: Employer[] = [];

   // Modal state
  showModal = false;
  modalAction: 'approve' | 'reject' | 'suspend' | 'delete' | null = null;
  selectedEmployer!: Employer;
  
  constructor(
    private router:Router,
    private location: Location
  ) { }

  ngOnInit(): void {
     this.employers = [
      { id: 1, companyName: 'TechSoft Ltd', email: 'hr@techsoft.com', status: 'pending' },
      { id: 2, companyName: 'CreativeHub', email: 'jobs@creativehub.com', status: 'approved' },
      { id: 3, companyName: 'DesignPro', email: 'info@designpro.com', status: 'suspended' },
      { id: 4, companyName: 'InnovateX', email: 'careers@innovatex.com', status: 'rejected' }
    ];
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

}
