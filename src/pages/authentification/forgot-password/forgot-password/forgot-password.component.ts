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
  if (!this.email) return;
  this.loading.show(); 
  this.userService.sendForgotPasswordEmail(this.email).subscribe({
    next: (res) => {
      this.loading.hide();
      console.log(res);
      this.router.navigate(['/otp'], { state: { email: this.email } });
    },
    error: (err) => {
      this.loading.hide();
      console.error(err);
      alert(err.error || "Something went wrong. Please try again.");
    }
  });
}


  navigate(link: string) {
    this.router.navigate([link]);
  }

}
