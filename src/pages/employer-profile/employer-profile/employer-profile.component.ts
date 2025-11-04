import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from '../../../services/User-Service/user.service';
import { CompanyService } from '../../../services/company-service/company.service';
import { CompanyInformationDTO } from '../../../models/CompanyInformationDTO';


@Component({
  selector: 'app-employer-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employer-profile.component.html',
  styleUrl: './employer-profile.component.scss'
})
export class EmployerProfileComponent implements OnInit{

showEditModal = false;
employerData: any = null;
companyData: CompanyInformationDTO | null = null;

showCompanyModal = false;
  companyInfo: any = {
  description: '',
  taxNumber: '',
  registeredAddress: '',
  registrationDocument: null,
  taxClearanceDocument: null,
  leaseAgreement: null
};

openCompanyModal() {
  this.showEditModal = false; 
  this.showCompanyModal = true;
}


closeCompanyModal() {
  this.showCompanyModal = false;
}

saveCompanyInfo() {
  console.log('Company Info Saved:', this.companyInfo);
  this.showCompanyModal = false;
}

  constructor(
    private location:Location,
    private userService:UserService,
    private companyService:CompanyService
  ) { }

  editData: any = {};

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
     if (storedUserId) {
     const userId = +storedUserId; 
     this.loadEmployerData(userId);
     this.loadCompanyData(userId);
   } else {
     console.error('No userId found in localStorage');
   }
  }


 editProfile() {
    this.editData = { ...this.employerData }; 
    this.showEditModal = true;
  }

  saveChanges() {
    this.employerData = { ...this.editData };
    this.showEditModal = false;
    console.log('Profile updated:', this.employerData);
  }

  closeModal() {
    this.showEditModal = false;
  }

  onFileSelected(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      this.editData[type] = file;
    }
  }

  goBack() {
    this.location.back();
  }

  loadEmployerData(userId: number): void {
    this.userService.getUserById(userId).subscribe({
      next: (data) => {
        this.employerData = data;
        console.log('Employer data loaded:', data);
      },
      error: (err) => {
        console.error('Error fetching employer data:', err);
      }
    });
  }

  loadCompanyData(userId: number): void {
    this.companyService.getCompanyInfoByUserId(userId).subscribe({
      next: (data) => {
        this.companyData = data;
        console.log('Company data loaded:', data);
      },
      error: (err) => {
        console.error('Error fetching company data:', err);
      }
    });
  }

  getCompanyDocuments() {
  if (!this.companyData) return [];

  return [
    {
      name: 'Registration Document',
      file: this.companyData.registrationDocument
    },
    {
      name: 'Tax Clearance Document',
      file: this.companyData.taxClearanceDocument
    },
    {
      name: 'Lease Agreement',
      file: this.companyData.leaseAgreement
    }
  ].filter(doc => doc.file);
 }

 downloadFile(file: any, filename: string) {
  if (!file) return;
  const blob = new Blob([new Uint8Array(file)], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
 }

 // Extracts a clean file name from resume_path
getResumeFileName(resumePath: string | null): string {
  if (!resumePath) return 'No Resume Uploaded';
  // In your DB, resume_path might be a long object or file reference string
  // You can improve this extraction depending on your format
  const parts = resumePath.split('/');
  return parts[parts.length - 1] || 'Resume.pdf';
}

// Downloads the employee's resume
downloadResume(userId: number): void {
  if (!userId) return;

  this.userService.downloadResume(userId).subscribe({
    next: (blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    },
    error: (err) => {
      console.error('Error downloading resume:', err);
    }
  });
}


}
