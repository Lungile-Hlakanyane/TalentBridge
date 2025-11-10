import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../models/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, userData, { responseType: 'text'}); 
  }

activateAccount(token: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/activate`, { 
    params: { token },
    responseType: 'text'
  });
}

login(email: string, password: string): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(
    `${this.apiUrl}/login`,
    { email, password },
    { headers: { 'Content-Type': 'application/json' } }
  );
}

savePreferences(preferences: any) {
  return this.http.post(`${this.apiUrl.replace('/users','')}/preferences/create`, preferences);
}

getPreferencesByUser(userId: string) {
  return this.http.get(`${this.apiUrl.replace('/users','')}/preferences/user/${userId}`);
}

getUserById(userId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/${userId}`);
}

getEmployerCount(): Observable<number> {
   return this.http.get<number>(`${this.apiUrl}/count/employers`);
 }

getEmployeeCount(): Observable<number> {
   return this.http.get<number>(`${this.apiUrl}/count/employees`);
}

getAllEmployers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employers`);
}

getAllEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees`);
}

downloadResume(userId: number): Observable<Blob> {
  return this.http.get(`http://localhost:8080/api/users/download-resume/${userId}`, {
    responseType: 'blob'
  });
}

// Send OTP to user's email
sendForgotPasswordEmail(email: string): Observable<string> {
  return this.http.post(`${this.apiUrl}/forgot-password`, null, { 
    params: { email },
    responseType: 'text' 
  });
}

// Verify OTP code
verifyResetCode(email: string, code: string): Observable<string> {
  return this.http.post(`${this.apiUrl}/verify-reset-code`, null, { 
    params: { email, code },
    responseType: 'text' 
  });
}

// Reset password
resetPassword(email: string, code: string, newPassword: string): Observable<string> {
  return this.http.post(`${this.apiUrl}/reset-password`, null, { 
    params: { email, code, newPassword },
    responseType: 'text' 
  });
}

getUserByEmail(email: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/by-email`, { params: { email } });
}

getAllUsersStatus(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/status/all`);
}

deleteAccount(userId: number) {
  return this.http.delete(`${this.apiUrl}/delete/${userId}`, { responseType: 'text' });
}



}
