import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from '../../../models/Chat';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { UserService } from '../../../services/User-Service/user.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatService } from '../../../services/chat-service/chat.service';
import { InviteService } from '../../../services/invite-service/invite.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {

  activeUser: any = null;
  messages: any[] = [];
  newMessage: string = '';
  currentUserId: number | null = null;

  chats: Chat[] = [];
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  tabs: string[] = ['All', 'Employers', 'Employees'];
  selectedTab: string = 'All';

  constructor(
    private router: Router,
    private location:Location,
    private userService:UserService,
    private chatService:ChatService,
    private inviteService: InviteService
  ){}

  ngOnInit() {
     this.loadAllUsers();
     this.loadCurrentUser();
     const storedUserId = localStorage.getItem('userId');
     if (storedUserId !== null) {
       this.loadChatHistory(Number(storedUserId));
     }
  }

  loadAllUsers() {
    this.userService.getAllEmployees().subscribe({
      next: (employees) => {
        this.userService.getAllEmployers().subscribe({
          next: (employers) => {
            const empList = employees.map((e: any) => ({ ...e, userType: 'Employee' }));
            const employerList = employers.map((e: any) => ({ ...e, userType: 'Employer' }));
            this.users = [...empList, ...employerList];
            this.filteredUsers = this.users;
          },
          error: (err) => console.error('Error fetching employers:', err)
        });
      },
      error: (err) => console.error('Error fetching employees:', err)
    });
  }

  goBack() {
    this.location.back();
  }

  openChat(chatId: number) {
   console.log('Opening chat with ID:', chatId);
   this.router.navigate(['/chat', chatId]);
  }

  startChat(user: any) {
    console.log('Starting chat with:', user);
    this.router.navigate(['/chat', user.id]);
  }

 
  filterUsers() {
    const term = this.searchTerm.toLowerCase();
    let filtered = this.users.filter((user) =>
      user.name.toLowerCase().includes(term) ||
      user.surname.toLowerCase().includes(term)
    );
    if (this.selectedTab === 'Employers') {
      filtered = filtered.filter((u) => u.userType === 'Employer');
    } else if (this.selectedTab === 'Employees') {
      filtered = filtered.filter((u) => u.userType === 'Employee');
    }
    this.filteredUsers = filtered;
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.filterUsers();
  }

  selectUser(user: any) {
    if (user.inviteStatus !== 'ACCEPTED') {
     alert('You can only chat with users who have accepted your invite.');
     return;
   }
    this.activeUser = user;
    console.log('Selected user:', user);
    this.loadChatHistory(user.id);
  }

 loadChatHistory(userId: number) {
  if (!this.currentUserId) return;
  this.chatService.getChatHistory(this.currentUserId, userId).subscribe({
    next: (chatHistory) => {
      this.messages = chatHistory.sort((a, b) => 
        new Date(a.timestamp ?? 0).getTime() - new Date(b.timestamp ?? 0).getTime()
      );
    },
    error: (err) => {
      console.error('Error loading chat history:', err);
      alert('Failed to load chat history. Please try again.');
      this.messages = [];
    }
  });
 }


 sendMessage() {
  if (!this.newMessage.trim() || !this.currentUserId || !this.activeUser) return;
  const message = {
    senderId: this.currentUserId,
    receiverId: Number(this.activeUser.id),
    message: this.newMessage,
    timestamp: new Date().toISOString()
  };
  this.chatService.sendMessage(message).subscribe({
    next: (savedMessage) => {
      this.messages.push(savedMessage);
      this.newMessage = '';
    },
    error: (err) => {
      console.error('Error sending message:', err);
      alert('Failed to send message. Please try again.');
    }
  });
}

 viewProfile(user: any) {
  console.log('Viewing profile of:', user);
  this.router.navigate(['/profile', user.id]);
}

loadCurrentUser() {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.currentUserId = Number(storedUserId);
      console.log('Current logged-in user ID:', this.currentUserId);
    } else {
      console.warn('No logged-in user found in localStorage.');
    }
  }

 sendInvite(user: any, event: Event) {
  event.stopPropagation();
  if (user.inviteStatus === 'PENDING' || user.inviteStatus === 'ACCEPTED') return;
  if (!this.currentUserId) {
    alert('User not logged in.');
    return;
  }
  const invite = {
    senderId: this.currentUserId,
    receiverId: user.id,
    subject: 'Connection Invitation',
    message: `Hello ${user.name}, you have received a connection invite from user #${this.currentUserId}.`,
  };
  user.inviteStatus = 'PENDING';
  this.inviteService.sendInvite(invite).subscribe({
    next: (response) => {
      console.log('Invite successfully sent:', response);
      user.inviteStatus = 'PENDING';
      alert(`Invite sent to ${user.name} ${user.surname}`);
    },
    error: (err) => {
      console.error('Error sending invite:', err);
      alert('Failed to send invite. Please try again.');
      user.inviteStatus = null;
    },
  });
}



}
