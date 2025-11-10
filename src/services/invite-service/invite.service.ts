import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invite } from '../../models/Invite';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  private apiUrl = 'http://localhost:8080/api/invites';

  constructor(private http: HttpClient) {}

  sendInvite(invite: any): Observable<string> {
    return this.http.post(`${this.apiUrl}/send`, invite, { responseType: 'text' });
  }

  getInvitesForUser(receiverId: number): Observable<Invite[]> {
    return this.http.get<Invite[]>(`${this.apiUrl}/user/${receiverId}`);
  }

  updateInviteStatus(inviteId: number, status: string): Observable<string> {
    const params = new HttpParams().set('status', status);
    return this.http.put(`${this.apiUrl}/${inviteId}/status`, null, { params, responseType: 'text' });
  }

  getInviteStatus(senderId: number, receiverId: number): Observable<string> {
  return this.http.get(`${this.apiUrl}/status`, {
    params: { senderId, receiverId },
    responseType: 'text'
  });
 }



}
