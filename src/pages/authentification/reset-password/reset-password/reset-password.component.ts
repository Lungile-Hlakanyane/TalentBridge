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

  email: string = '';
  code: string = '';

  constructor(
    private location: Location,
    private router: Router,
    private userService: UserService,
    private loading: LoadingService
  ) { 
     const state = this.router.getCurrentNavigation()?.extras.state;
     this.email = state ? state['email'] : '';
     this.code = state ? state['code'] : '';
  }

  ngOnInit(): void {}

   togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

 resetPassword() {
    if (!this.password || this.password !== this.confirmPassword) return;
    this.loading.show();
    this.userService.resetPassword(this.email, this.code, this.password).subscribe({
      next: (res) => {
        this.loading.hide();
        console.log(res);
        alert("Password reset successfully. Please login.");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading.hide();
        console.error(err);
        alert(err.error || "Failed to reset password.");
      }
    });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

}
