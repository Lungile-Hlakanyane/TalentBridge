import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl + '/api/announcements';

  getAllAnnouncements(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getAnnouncementById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createAnnouncement(announcement: any): Observable<any> {
    return this.http.post(this.apiUrl, announcement);
  }

  updateAnnouncement(id: number, announcement: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, announcement);
  }

  deleteAnnouncement(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
