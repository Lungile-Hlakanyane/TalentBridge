import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/User-Service/user.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { LoadingService } from '../../../../services/Loading-Service/loading.service';
import { LoadingSpinnerComponent } from '../../../../re-usable-components/loading-spinner/loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, LoadingSpinnerComponent],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent implements OnInit {
  otp: string[] = ['', '', '', '', '', ''];
  otpArray = new Array(6);
  email: string = '';


  constructor(
    private location: Location,
    private router: Router,
    private userService: UserService,
    private loading: LoadingService
  ) { 
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.email= state? state['email'] : ''; 
  }

  ngOnInit(): void {
    
  }

   moveToNext(event: any, index: number) {
    const input = event.target;
    if (input.value && index < 5) {
      const nextInput = input.parentElement.children[index + 1];
      if (nextInput) nextInput.focus();
    }
  }

  isOtpComplete(): boolean {
   return this.otp.every(digit => digit !== '' && digit.length === 1);
 }


 verifyOtp() {
  if (!this.isOtpComplete() || !this.email) return;
  const otpString = this.otp.join('');
  this.loading.show();
  this.userService.verifyResetCode(this.email, otpString).subscribe({
    next: (res) => {
      this.loading.hide();
      console.log(res);
      this.router.navigate(['/reset-password'], { state: { email: this.email, code: otpString } });
    },
    error: (err) => {
      this.loading.hide();
      console.error(err);
      alert(err.error || "Invalid or expired code.");
    }
  });
}


  resendOtp() {
    console.log('Resend OTP triggered');
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  goBack() {
    this.location.back();
  } 

}
