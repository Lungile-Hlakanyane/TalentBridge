import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/User-Service/user.service';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-profile.component.html',
  styleUrl: './show-profile.component.scss'
})
export class ShowProfileComponent implements OnInit{

  user!: any;

  constructor(
    private userServivice: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  goBack(): void{
    this.location.back();
  }


  ngOnInit(): void {
    this.user = {
      fullName: 'Luyanda Baartman',
      email: 'lungilevincenthlakanyane@gmail.com',
      role: 'EMPLOYER',
      companyName: 'Vincent Technologies PTY (LTD)',
      contactNumber: '0623723317',
      companyDescription: 'Vincent Technologies is a digital solutions company offering web and app development services.',
      taxNumber: '345656756767',
      registeredAddress: '1 Hugh Street, Sunnyside, Pretoria, Gauteng',
      registrationDocument: 'Uploaded',
      taxClearanceDocument: 'Uploaded',
      leaseAgreement: 'Uploaded'
    };
  } 

  goTo(page: string) {
    this.router.navigateByUrl(page);
    console.log(`Navigate to ${page}`);
  }

}
