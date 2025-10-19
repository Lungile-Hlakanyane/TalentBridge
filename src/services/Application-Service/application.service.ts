import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobApplication } from '../../models/JobApplication';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private apiUrl = 'http://localhost:8080/api/applications';

  constructor(private http: HttpClient) {}

  applyForJob(application: JobApplication): Observable<any> {
    return this.http.post(`${this.apiUrl}/apply`, application);
  }

  getApplicationsForJob(jobId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/job/${jobId}`);
  }
}
