import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-interviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-interviews.component.html',
  styleUrl: './employee-interviews.component.scss'
})
export class EmployeeInterviewsComponent implements OnInit {

  interviews = [
  {
    companyName: 'ABC Corporation',
    employerEmail: 'johndoe@example.com',
    phoneNumber: '1234567890',
    interviewType: 'Remote'
  },
  {
    companyName: 'XYZ Inc.',
    employerEmail: 'janedoe@example.com',
    phoneNumber: '0987654321',
    interviewType: 'Face to Face'
  }
];

  constructor(private router:Router){}

  ngOnInit(): void {
   
  }

  goBack(){
    this.router.navigateByUrl('/')
  }

}
