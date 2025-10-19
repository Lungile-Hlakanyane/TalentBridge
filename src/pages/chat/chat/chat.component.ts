import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '../../../models/Message';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  @ViewChild('chatWindow') chatWindow!: ElementRef;

  messages: Message[] = [];
  newMessage: string = '';
  chatPartnerName: string = 'Employer Name';
  chatId!: number;
  searchTerm: string = '';
  filteredChats: any[] = [];

  chatPartnerRole: string = 'Employer'; 
  lastActive: Date = new Date(Date.now() - 1000 * 60 * 15); 

  constructor(
    private route: ActivatedRoute,
    private location:Location
  ){}

  ngOnInit(): void {
    this.filteredChats = this.chatList;
    this.route.paramMap.subscribe(params => {
    const id = params.get('chatId');
    if (id) {
      this.chatId = +id;
      console.log('Loaded chat with ID:', this.chatId);
    }
    this.loadMessages();
  });
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    this.messages.push({
      content: this.newMessage,
      sender: 'employee',
      timestamp: new Date()
    });
    this.newMessage = '';
    setTimeout(() => this.scrollToBottom(), 100);
  }

  scrollToBottom() {
    try {
      this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error', err);
    }
  }

  receiveMessage(content: string) {
    this.messages.push({
      content,
      sender: 'employer',
      timestamp: new Date()
    });
    setTimeout(() => this.scrollToBottom(), 100);
  }

   loadMessages() {
  this.messages = [
    { content: 'Hello! I am interested in the job position you posted.', sender: 'employee', timestamp: new Date() },
    { content: 'Hi! Thanks for reaching out. Could you please tell me a bit more about your experience?', sender: 'employer', timestamp: new Date() },
    { content: 'Sure! I have two years of experience in frontend development using Angular and Ionic.', sender: 'employee', timestamp: new Date() },
    { content: 'That’s great! We’re actually using the same tech stack for our projects.', sender: 'employer', timestamp: new Date() },
    { content: 'Awesome! I’d love to learn more about your current openings and team structure.', sender: 'employee', timestamp: new Date() },
    { content: 'We currently have an opening for a Junior Developer position. Are you available to start immediately?', sender: 'employer', timestamp: new Date() },
    { content: 'Yes, I am available to start right away.', sender: 'employee', timestamp: new Date() },
    { content: 'Perfect. Could you please share your portfolio or GitHub profile?', sender: 'employer', timestamp: new Date() },
    { content: 'Of course! You can check my projects at github.com/Lungile-Hlakanyane.', sender: 'employee', timestamp: new Date() },
    { content: 'Excellent, I’ll review it and get back to you. Thank you for sharing.', sender: 'employer', timestamp: new Date() },
    { content: 'Thank you! I look forward to hearing from you.', sender: 'employee', timestamp: new Date() },
    { content: 'Likewise! We’ll be in touch soon.', sender: 'employer', timestamp: new Date() }
  ];
  setTimeout(() => this.scrollToBottom(), 100);
}

chatList = [
  { id: 1, name: 'John Doe', role: 'Employer', lastActive: new Date(), lastMessage: 'Sure, I’ll send the details.', time: new Date() },
  { id: 2, name: 'Sarah Smith', role: 'Employee', lastActive: new Date(Date.now() - 1000 * 60 * 20), lastMessage: 'Thank you for the interview!', time: new Date() },
  { id: 3, name: 'Michael Brown', role: 'Employer', lastActive: new Date(Date.now() - 1000 * 60 * 45), lastMessage: 'Can we schedule a call?', time: new Date() },
  { id: 4, name: 'Recruiter Admin', role: 'Employer', lastActive: new Date(Date.now() - 1000 * 60 * 90), lastMessage: 'Your application looks good!', time: new Date() }
];


openChat(chat: any) {
  this.chatId = chat.id;
  this.chatPartnerName = chat.name;
  this.loadMessages(); 
}

filterChats() {
  const term = this.searchTerm.toLowerCase();
  this.filteredChats = this.chatList.filter(chat =>
    chat.name.toLowerCase().includes(term) ||
    chat.lastMessage.toLowerCase().includes(term)
  );
}

  goBack() {
    this.location.back();
  }

  viewProfile() {
   alert(`Viewing profile of ${this.chatPartnerName}`);
  }


}
