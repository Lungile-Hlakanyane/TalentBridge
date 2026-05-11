import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HiredCandidateServiceService {

   private apiUrl = `${environment.apiUrl}/api/hired-candidates`

  constructor(private http:HttpClient) { }

  hireCandidate(
  employerUserId: number,
  candidateEmail: string,
  position: string
): Observable<any> {

  return this.http.post(
    `${this.apiUrl}/hire/${employerUserId}`,
    {
      candidateEmail,
      position
    }
  );
}

  getByEmployer(employerUserId: number): Observable<any[]> {
   return this.http.get<any[]>(`${this.apiUrl}/employer/${employerUserId}`);
  }

}
