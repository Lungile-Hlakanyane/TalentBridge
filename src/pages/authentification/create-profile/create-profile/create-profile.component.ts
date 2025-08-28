import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.scss'
})
export class CreateProfileComponent  implements OnInit{

  profileForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder, private router: Router)
    {}

  ngOnInit() {
     this.profileForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,}$')]],
      address: ['', Validators.required],
      role: ['Employee', Validators.required],
      resume: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
    { validators: this.passwordMatchValidator } 
  );
  }

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }


  submitProfile() {
    if (this.profileForm.valid) {
      console.log('Profile Created:', this.profileForm.value);
      console.log('Uploaded File:', this.selectedFile);
      this.router.navigate(['/login']);
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  goBack() {
    this.router.navigate(['/login']);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.profileForm.patchValue({ resume: this.selectedFile });
    }
  }

}
