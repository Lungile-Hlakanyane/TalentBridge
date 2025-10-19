import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { UserService } from '../../../../services/User-Service/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.scss'
})
export class CreateProfileComponent  implements OnInit{

  profileForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private userService: UserService
  )
    {}

ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,}$')]],
      address: ['', Validators.required],
      role: ['Employee', Validators.required],
      resume: [],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      companyName: ['']
    },
    { validators: this.passwordMatchValidator });

    // 👇 Watch for role changes to toggle companyName validation
    this.profileForm.get('role')?.valueChanges.subscribe(role => {
      const companyControl = this.profileForm.get('companyName');
      if (role === 'Employer') {
        companyControl?.setValidators([Validators.required, Validators.minLength(2)]);
      } else {
        companyControl?.clearValidators();
        companyControl?.setValue('');
      }
      companyControl?.updateValueAndValidity();
    });
  }

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }


  submitProfile() {
  if (this.profileForm.valid) {
    const formData = new FormData();
    const formValue = this.profileForm.value;

    Object.keys(formValue).forEach(key => {
      if (key === 'resume' && formValue.resume instanceof File) {
        formData.append('resume', formValue.resume);
      } else {
        formData.append(key, formValue[key]);
      }
    });

    this.userService.createUser(formData).subscribe({
      next: (res) => {
        console.log('Profile created:', res);
        alert('Profile created successfully! Please check your email for activation link.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error creating profile:', err);
        alert('Failed to create profile');
      }
    });
  } else {
    this.profileForm.markAllAsTouched();
  }
}

  goBack() {
    this.router.navigate(['/login']);
  }

onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.profileForm.patchValue({ resume: file }); // store file reference
    this.profileForm.get('resume')?.updateValueAndValidity();
  }
}


}
