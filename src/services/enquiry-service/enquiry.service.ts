import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EnquiryRequest } from '../../models/EnquiryRequest';
import { Observable } from 'rxjs';
import { Enquiry } from '../../models/Enquiry';


@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  private apiUrl = 'http://localhost:8080/api/enquiries';

  constructor(private http:HttpClient) { }

  submitEnquiry(data: EnquiryRequest){
    return this.http.post(this.apiUrl, data);
  }

  getEnquiries(status?: string): Observable<Enquiry[]> {
    let params = new HttpParams();
    if (status && status !== 'all') {
      params = params.set('status', status);
    }
    return this.http.get<Enquiry[]>(this.apiUrl, { params });
  }

  updateStatus(id: any, status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED'): Observable<Enquiry> {
    const params = new HttpParams().set('status', status);
    return this.http.patch<Enquiry>(`${this.apiUrl}/${id}/status`, null, { params });
  }

}
