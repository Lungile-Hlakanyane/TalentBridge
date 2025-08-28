import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from '../../../models/Chat';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {

  chats: Chat[] = [];

  constructor(
    private router: Router,
    private location:Location
  ){}

  ngOnInit() {
      this.chats = [
      { id: 1, sender: 'Tech Solutions', lastMessage: 'Hi, are you available for an interview?', timestamp: new Date(), unreadCount: 2 },
      { id: 2, sender: 'Innovate Inc', lastMessage: 'Your application has been reviewed.', timestamp: new Date(), unreadCount: 0 },
      { id: 3, sender: 'Creative Minds', lastMessage: 'Can we schedule a call?', timestamp: new Date(), unreadCount: 1 },
      { id: 4, sender: 'NextGen Software', lastMessage: 'Please check your email for details.', timestamp: new Date(), unreadCount: 0 },
      { id: 5, sender: 'DataWorks', lastMessage: 'We have a new project you might like.', timestamp: new Date(), unreadCount: 3 }
    ];
  }

  goBack() {
    this.location.back();
  }

  openChat(chatId: number) {
    console.log('Opening chat with ID:', chatId);
  }

}
