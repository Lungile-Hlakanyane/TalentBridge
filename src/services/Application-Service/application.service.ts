import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobApplication } from '../../models/JobApplication';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private apiUrl = `${environment.apiUrl}/api/applications`;

  constructor(private http: HttpClient) {}

applyForJob(data: JobApplication, resumeFile: File): Observable<any> {
  const formData = new FormData();
  const { resumePath,...dtoWithoutResume } = data;
  formData.append('data', new Blob([JSON.stringify(dtoWithoutResume)], {
    type: 'application/json'
  }));
  formData.append('resume', resumeFile);
  return this.http.post(
    'http://http://10.28.168.224:8080/api/applications/apply',
    formData,
    { responseType: 'text' } 
  );
}

  getApplicationsForJob(jobId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/job/${jobId}`);
  }

  getApplicationsForUser(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${email}`);
  }

  getJobDetails(jobId: number): Observable<any> {
    return this.http.get(`http://http://10.28.168.224:8080/api/jobs/${jobId}`);
  }

  getApplicationCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  getApplicationById(id: number): Observable<any> {
   return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getAllApplications(): Observable<any[]> {
   return this.http.get<any[]>(`${this.apiUrl}`);
  }


  getUniqueApplicantCount(jobId: number): Observable<number> {
  return this.http.get<number>(`${this.apiUrl}/job/${jobId}/applicant-count`);
}
 
}
