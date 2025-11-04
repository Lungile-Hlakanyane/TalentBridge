import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/User-Service/user.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoadingService } from '../../../../services/Loading-Service/loading.service';
import { LoadingSpinnerComponent } from '../../../../re-usable-components/loading-spinner/loading-spinner/loading-spinner.component';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit{
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  passwordMismatch: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
    private userService: UserService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {}

   togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  resetPassword() {
    this.passwordMismatch = this.password !== this.confirmPassword;
    if (this.passwordMismatch) return;
    console.log('Password reset successful:', this.password);
    this.router.navigate(['/login']);
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

}
