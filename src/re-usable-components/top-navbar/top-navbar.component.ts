import { Component, HostListener, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company-service/company.service';
import { CompanyInformationDTO } from '../../models/CompanyInformationDTO';
import { LoadingService } from '../../services/Loading-Service/loading.service';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner/loading-spinner.component';

type FileField = 'registrationDocument' | 'taxClearanceDocument' | 'leaseAgreement';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.scss'
})


export class TopNavbarComponent implements OnInit {
  @ViewChild('registrationDocumentInput') registrationDocumentInput!: ElementRef<HTMLInputElement>;
  @ViewChild('taxClearanceDocumentInput') taxClearanceDocumentInput!: ElementRef<HTMLInputElement>;
  @ViewChild('leaseAgreementInput') leaseAgreementInput!: ElementRef<HTMLInputElement>;

  showEditCompanyModal = false;

  dropdownOpen = false;
  companyDropdownOpen = false;
  userRole: string | null = null;
  showAddCompanyModal = false;

  
  constructor(
    private location: Location,
    private router: Router,
    private companyService:CompanyService,
    private loading:LoadingService
  ) { } 

  companyData = {
    companyDescription: '',
    taxNumber: '',
    registeredAddress: '',
    registrationDocument: null as File | null,
    taxClearanceDocument: null as File | null,
    leaseAgreement: null as File | null
  };

  openAddCompanyModal() {
   this.showAddCompanyModal = true;
   this.companyDropdownOpen = false;
  }


openEditCompanyModal() {
  this.companyDropdownOpen = false;
  this.showEditCompanyModal = true;
  this.companyService.getCompanyInfoByUserId(Number(localStorage.getItem('userId'))).subscribe({
    next: (data) => {
      this.companyData = {
        companyDescription: data.companyDescription,
        taxNumber: data.taxNumber,
        registeredAddress: data.registeredAddress,
        registrationDocument: null,
        taxClearanceDocument: null,
        leaseAgreement: null
      };
    },
    error: (err) => {
      console.error('Failed to load company info:', err);
    }
  });
}


  closeAddCompanyModal() {
   this.showAddCompanyModal = false;
  }

  onFileChange(event: Event, field: FileField) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.companyData[field] = input.files[0];
    }
  }

  removeFile(event: MouseEvent, field: FileField) {
    event.stopPropagation();
    this.companyData[field] = null;
    if (field === 'registrationDocument') this.registrationDocumentInput.nativeElement.value = '';
    if (field === 'taxClearanceDocument') this.taxClearanceDocumentInput.nativeElement.value = '';
    if (field === 'leaseAgreement') this.leaseAgreementInput.nativeElement.value = '';
  }


 submitCompanyForm() {
  const payload: CompanyInformationDTO = {
    ...this.companyData,
    userId: Number(localStorage.getItem('userId')),
    companyDescription: ''
  };
  this.loading.show();
  this.companyService.createCompanyInfo(payload).subscribe({
    next: (res) => {
      this.loading.hide();
      console.log('Company created:', res);
      this.showAddCompanyModal = false;
      alert('Company information submitted successfully!');
    },
    error: (err) => {
      this.loading.hide();
      console.error('Error creating company:', err);
      alert('Failed to submit company information.');
    }
  });
}


  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
  }

   toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.companyDropdownOpen = false;
  }

  toggleCompanyDropdown() {
    this.companyDropdownOpen = !this.companyDropdownOpen;
    this.dropdownOpen = false; 
  }

  logout() {
    this.loading.show();
    this.dropdownOpen = false;
    this.router.navigate(['/login']).then(() => {
      localStorage.clear();
      this.loading.hide();
    });
  }

  goBack() {
    this.location.back();
  }

  navigate(link:string){
    this.router.navigate([link]);
  }

 @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-dropdown') && !target.closest('.company-dropdown')) {
      this.dropdownOpen = false;
      this.companyDropdownOpen = false;
    }
  }

  triggerFileInput(inputName: string) {
    if (inputName === 'registrationDocumentInput') this.registrationDocumentInput.nativeElement.click();
    else if (inputName === 'taxClearanceDocumentInput') this.taxClearanceDocumentInput.nativeElement.click();
    else if (inputName === 'leaseAgreementInput') this.leaseAgreementInput.nativeElement.click();
  }

  onEditFileChange(event: Event, field: FileField) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.companyData[field] = input.files[0];
  }
}

closeEditCompanyModal() {
  this.showEditCompanyModal = false;
}


  updateCompanyInfo() {
  const payload: CompanyInformationDTO = {
    ...this.companyData,
    userId: Number(localStorage.getItem('userId')),
    companyDescription: ''
  };

  this.companyService.updateCompanyInfo(payload).subscribe({
    next: (res) => {
      console.log('Company info updated:', res);
      alert('Company information updated successfully!');
      this.showEditCompanyModal = false;
    },
    error: (err) => {
      console.error('Error updating company info:', err);
      alert('Failed to update company information.');
    }
  });
}

}
