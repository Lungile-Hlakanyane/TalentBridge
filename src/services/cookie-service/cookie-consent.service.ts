import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
type ConsentValue = 'all' | 'necessary'; 
type ConsentType = ConsentValue | null;  

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {

  private readonly CONSENT_KEY = 'tb_cookie_consent';

  constructor(private http:HttpClient) { }

  hasConsent(): boolean {
    return localStorage.getItem(this.CONSENT_KEY) !== null;
  }

  getConsent(): ConsentType {
    return localStorage.getItem(this.CONSENT_KEY) as ConsentType;
  }

   setConsent(type: ConsentValue): void { 
    localStorage.setItem(this.CONSENT_KEY, type);
    this.http.post(`${environment.apiUrl}/api/consent/cookies`, { 
      consent: type, 
      timestamp: new Date().toISOString() 
    }).subscribe();
  }

  
}
