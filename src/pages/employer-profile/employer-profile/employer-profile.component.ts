import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from '../../../services/User-Service/user.service';

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

   employerData2 = {
    fullName: 'Lungile Vincent Hlakanyane',
    email: 'lungile@vintechsolutions.co.za',
    contactNumber: '+27 65 123 4567',
    role: 'Employer',
    companyName: 'Vintech IT Solutions',
    companyDescription: 'A recruitment agency connecting top talent with growing companies across South Africa.',
    taxNumber: 'TXN-8745932',
    registeredAddress: '123 Rosebank, Johannesburg, South Africa',
    leaseAgreement: true,
    documents: [
      { name: 'Registration Document.pdf' },
      { name: 'Tax Clearance Certificate.pdf' },
      { name: 'Lease Agreement.pdf' }
    ]
  };

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
  this.showEditModal = false; // close edit modal if open
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
     private userService:UserService
  ) { }

  editData: any = {};

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
     if (storedUserId) {
     const userId = +storedUserId; 
     this.loadEmployerData(userId);
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

}
