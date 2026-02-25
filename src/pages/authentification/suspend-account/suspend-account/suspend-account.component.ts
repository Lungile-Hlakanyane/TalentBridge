import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/User-Service/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-suspend-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suspend-account.component.html',
  styleUrl: './suspend-account.component.scss'
})
export class SuspendAccountComponent implements OnInit{

  user: any;

  constructor(
    private userService:UserService,
    private route:ActivatedRoute,
    private router:Router,
    private location:Location
  ){}


  ngOnInit(): void {
   this.route.queryParams.subscribe(params => {
     const email = params['email'];
     this.userService.getUserByEmail(email).subscribe({
       next: (user) => {
         this.user = user;
       },
       error: (err) => console.error(err)
     });
    });
  }

  calculateDaysLeft(suspensionExpiry: string): number {
    const expiryDate = new Date(suspensionExpiry);
    const currentDate = new Date();
    const timeDifference = expiryDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysLeft;
  }

  goTo(page: string) {
    this.router.navigateByUrl(page);
    console.log(`Navigate to ${page}`);
  }

    goBack() {
    this.location.back();
  }


}
