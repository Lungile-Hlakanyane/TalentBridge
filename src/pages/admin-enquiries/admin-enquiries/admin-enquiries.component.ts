import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Enquiry } from '../../../models/Enquiry';
import { EnquiryService } from '../../../services/enquiry-service/enquiry.service';
import { LoadingService } from '../../../services/Loading-Service/loading.service';
import { LoadingSpinnerComponent } from '../../../re-usable-components/loading-spinner/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-admin-enquiries',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './admin-enquiries.component.html',
  styleUrl: './admin-enquiries.component.scss'
})
export class AdminEnquiriesComponent implements OnInit{

  enquiries: Enquiry[] = [];
  filteredEnquiries: Enquiry[] = [];
  selectedEnquiry: Enquiry | null = null;
  statusFilter: 'all' | 'NEW' | 'IN_PROGRESS' | 'RESOLVED' = 'all';
  searchTerm: string = '';

  subjectLabels: { [key: string]: string } = {
    HIRING: 'I want to hire talent',
    JOB: 'I’m looking for a job',
    PARTNERSHIP: 'Partnership inquiry',
    SUPPORT: 'Platform support'
  };


  constructor(
    private loading:LoadingService,
    private enquiryService:EnquiryService,
    private location:Location,
  ){}

  goBack(){
    this.location.back();
  }

   async loadEnquiries() {
     this.loading.show();
    const statusParam = this.statusFilter === 'all'? undefined : this.statusFilter;
    this.enquiryService.getEnquiries().subscribe({
      next: (data) => {
        this.enquiries = data;
        this.applyFilters();
         this.loading.hide();
      },
      error: (err) => {
        console.error('Failed to load enquiries:', err);
        this.loading.hide();
      }
    });
  }

   applyFilters() {
    this.filteredEnquiries = this.enquiries.filter(e => {
      const matchesSearch =!this.searchTerm ||
        e.fullName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        e.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        e.company?.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesSearch;
    });
  }

  selectEnquiry(enquiry: Enquiry) {
    this.selectedEnquiry = enquiry;
    if (enquiry.status === 'NEW') {
      this.updateStatus(enquiry, 'IN_PROGRESS');
    }
  }

 updateStatus(enquiry: Enquiry, status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED') {
  this.enquiryService.updateStatus(enquiry.id, status).subscribe({
    next: (updated) => {
      enquiry.status = updated.status;
      this.applyFilters();
    },
    error: (err) => console.error('Update failed:', err)
  });
}

  closeDetails() {
    this.selectedEnquiry = null;
  }


  ngOnInit(): void {
    this.loadEnquiries();
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase().replace('_', '-')}`;
  }

  // Helper to convert backend status to display
  getDisplayStatus(status: string): string {
    return status.replace('_', ' ').toLowerCase();
  }

}
