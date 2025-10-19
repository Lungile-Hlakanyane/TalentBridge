import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../services/User-Service/user.service';

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

  constructor(
    private router: Router,
    private userService: UserService
  ){}

  ngOnInit() {}

login() {
  console.log('Logging in with:', this.email, this.password);
  this.userService.login(this.email, this.password).subscribe({
    next: (response: any) => {
      console.log('Login response:', response);
      localStorage.setItem('role', response.role);
      localStorage.setItem('email', this.email);
      localStorage.setItem('userId', response.userId);

      if (response.role === 'ADMIN') {
        this.router.navigate(['/admin-dashboard']);
      } else if (response.role === 'EMPLOYER') {
        this.router.navigate(['/employer-dashboard']);
      } else {
        this.router.navigate(['/industry-selection']);
      }
    },
    error: (err) => {
      alert(err.error || 'Invalid email or password');
    }
  });
}


  navigate(link:string){
    this.router.navigate([link]); 
  }

}
