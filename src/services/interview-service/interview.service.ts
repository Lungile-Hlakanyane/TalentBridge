import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterviewDTO } from '../../models/InterviewDTO';


@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private apiUrl = 'http://localhost:8080/api/interviews'

  constructor(private http:HttpClient) { }

  createInterview(interview: InterviewDTO): Observable<InterviewDTO> {
    return this.http.post<InterviewDTO>(this.apiUrl, interview);
  }

  getInterview(id: number): Observable<InterviewDTO> {
    return this.http.get<InterviewDTO>(`${this.apiUrl}/${id}`);
  }

  getInterviewsByUserId(userId: number): Observable<InterviewDTO[]> {
    return this.http.get<InterviewDTO[]>(`${this.apiUrl}/user/${userId}`);
  }

  updateInterview(interview: InterviewDTO): Observable<InterviewDTO> {
    return this.http.put<InterviewDTO>(this.apiUrl, interview);
  }

  deleteInterview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  declineCandidate(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/applications/send-rejection-email`, email);
  }

  sendBackgroundCheckEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/applications/send-background-check-email`, email);
  }

  sendOfferEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/applications/send-offer-email`, email);
  }

}
