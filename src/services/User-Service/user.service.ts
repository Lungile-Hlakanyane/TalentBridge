import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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


}
