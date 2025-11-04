import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/User-Service/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../../../re-usable-components/loading-spinner/loading-spinner/loading-spinner.component';
import { LoadingService } from '../../../../services/Loading-Service/loading.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, LoadingSpinnerComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit{
  email: string = '';

  constructor(
    private location:Location,
    private router: Router,
    private userService: UserService,
    private loading: LoadingService
  ) { }

  goBack(){
    this.location.back();
  }

  ngOnInit(): void {
   
  }

   submit() {

    this.router.navigate(['/otp']);

    // this.loading.show();
    // this.userService.forgotPassword(this.email).subscribe({
    //   next: (res) => {
    //     this.loading.hide();
    //     alert('Password reset link sent! Check your email.');
    //     this.router.navigate(['/login']);
    //   },
    //   error: (err) => {
    //     this.loading.hide();
    //     alert(err.error || 'Something went wrong. Try again.');
    //   }
    // });
  }

  navigate(link: string) {
    this.router.navigate([link]);
  }

}
