import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from '../../models/Subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

 private baseUrl = 'http://localhost:8080/api/subscriptions';

  constructor(private http: HttpClient) {}

  // Create a subscription
  createSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.baseUrl}/create`, subscription);
  }

  // Get subscriptions by userId
  getSubscriptionsByUser(userId: number): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${this.baseUrl}/user/${userId}`);
  }

  // Get subscriptions by job role
  getSubscriptionsByRole(jobRole: string): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${this.baseUrl}/role/${jobRole}`);
  }

}
