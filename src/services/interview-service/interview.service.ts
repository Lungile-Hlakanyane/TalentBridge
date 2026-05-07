import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterviewDTO } from '../../models/InterviewDTO';


@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private apiUrl = 'http://localhost:8080/api/interviews';
  private baseUrl =  'http://localhost:8080/api/applications';

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


 sendRejectionEmail(
  candidate: any,
  jobTitle: string,
  companyName: string
): Observable<any> {

  return this.http.post(
    `${this.baseUrl}/send-rejection-email`,
    {
      email: candidate.email,
      candidateName: candidate.name,
      jobTitle: jobTitle,
      companyName: companyName
    }
  );
}
  sendBackgroundCheckEmail(candidate: any): Observable<any> {
   return this.http.post(
    `${this.baseUrl}/send-background-check-email`,
    {
      email: candidate.email,
      name: candidate.name
    }
   );
  }

sendOfferEmail(offerData: any): Observable<any> {
  return this.http.post(
    `${this.baseUrl}/send-offer-email`,
    offerData,
    {
      responseType: 'text'
    }
  );
}

  getInterviewCountByUserId(userId: number): Observable<number> {
   return this.http.get<number>(`${this.apiUrl}/count/user/${userId}`);
  }

  getInterviewsByEmail(email: string): Observable<InterviewDTO[]> {
   return this.http.get<InterviewDTO[]>(`${this.apiUrl}/email/${email}`);
  }

}
