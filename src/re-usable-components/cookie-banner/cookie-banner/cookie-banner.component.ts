import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { CookieConsentService } from '../../../services/cookie-service/cookie-consent.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.scss'
})
export class CookieBannerComponen implements OnInit {

  showBanner = false;

  constructor(
    private router:Router,
    private cookieConsentService:CookieConsentService,
    private location:Location){}

  goBack(){
    this.location.back();
  }

  navigate(link:string){
    this.router.navigateByUrl(link);
  }

  ngOnInit(): void {
    this.showBanner = !this.cookieConsentService.hasConsent(); //only display when the user has not decided yet
  }

   acceptAll(): void {
    this.cookieConsentService.setConsent('all');
    this.showBanner = false;
  }

  acceptNecessary(): void {
    this.cookieConsentService.setConsent('necessary');
    this.showBanner = false;
  }

  openPreferences(): void {
    this.acceptNecessary();
  }

}
