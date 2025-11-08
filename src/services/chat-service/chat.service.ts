import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatMessage } from '../../models/ChatMessage';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = 'http://localhost:8080/api/chat';

  constructor(private http: HttpClient) {}

  sendMessage(message: ChatMessage): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.baseUrl}/send`, message);
  }

 
  getChatHistory(senderId: number, receiverId: number): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.baseUrl}/history`, {
      params: { senderId: senderId.toString(), receiverId: receiverId.toString() }
    });
  }

  getUnreadMessages(receiverId: number): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.baseUrl}/unread/${receiverId}`);
  }

  markAsRead(messageId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/read/${messageId}`, {});
  }
  
}
