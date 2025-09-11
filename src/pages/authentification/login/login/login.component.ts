import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  email: string = '';
  password: string = '';

  constructor(private router: Router){}

  ngOnInit() {}

 login() {
    console.log('Logging in with:', this.email, this.password);
    if (this.email.toLowerCase() === 'employer@gmail.com') {
      localStorage.setItem('role', 'Employer');
      localStorage.setItem('email', this.email);
      this.router.navigate(['/employer-dashboard']);
    } if(this.email.toLowerCase() === 'admin@gmail.com'){
      localStorage.setItem('role', 'Admin');
      localStorage.setItem('email', this.email);
      this.router.navigate(['/admin-dashboard']);
    }
    else {
      localStorage.setItem('role', 'Job Seeker');
      localStorage.setItem('email', this.email);
      this.router.navigate(['/industry-selection']);
    }
  }

  navigate(link:string){
    this.router.navigate([link]); 
  }

}
