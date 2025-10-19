import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../../models/Job';


@Injectable({
  providedIn: 'root'
})
export class JobService {

  private baseUrl = 'http://localhost:8080/api/jobs';

  constructor(private http: HttpClient) { }

   // Create a new job
  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(`${this.baseUrl}/create`, job);
  }

  // Get all jobs
  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}`);
  }

  // Get job by id
  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.baseUrl}/${id}`);
  }

  // Get jobs by employer
  getJobsByUserId(userId: number): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/user/${userId}`);
  }

  // Update a job
  updateJob(id: number, job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.baseUrl}/${id}`, job);
  }

  // Delete a job
  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getEmployerCount(): Observable<number> {
   return this.http.get<number>(`${this.baseUrl}/count/employers`);
  }

  approveJob(id: number): Observable<Job> {
    return this.http.put<Job>(`${this.baseUrl}/${id}/approve`, {});
  }

  declineJob(id: number): Observable<Job> {
    return this.http.put<Job>(`${this.baseUrl}/${id}/decline`, {});
  }

}
