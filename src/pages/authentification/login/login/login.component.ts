import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../services/User-Service/user.service';
import { LoadingSpinnerComponent } from '../../../../re-usable-components/loading-spinner/loading-spinner/loading-spinner.component';
import { LoadingService } from '../../../../services/Loading-Service/loading.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  rememberMe: boolean = false;
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private loading:LoadingService
  ){}

  ngOnInit() {
    this.loadData();
  }

login() {
  this.loading.show();
  this.userService.login(this.email, this.password).subscribe({
    next: (response: any) => {
      this.loading.hide(); 

      localStorage.setItem('role', response.role);
      localStorage.setItem('email', this.email);
      localStorage.setItem('userId', response.userId);

       
      if (this.rememberMe) {
        localStorage.setItem('token', response.token);
      } else {
        sessionStorage.setItem('token', response.token); 
      }

      if (response.role === 'ADMIN') {
        this.router.navigate(['/admin-dashboard']);
      } else if (response.role === 'EMPLOYER') {
        this.router.navigate(['/employer-dashboard']);
      } else {
        this.router.navigate(['/industry-selection']);
      }
    },
    error: (err) => {
      this.loading.hide(); // hide spinner on error
      alert(err.error || 'Invalid email or password');
    }
  });
}

  navigate(link:string){
    this.router.navigate([link]); 
  }

  loadData() {
  this.loading.show();
  this.userService.getUserById(1).subscribe({
    next: (data) => {
      console.log(data);
      this.loading.hide();
    },
    error: () => this.loading.hide()
  });
}

}
