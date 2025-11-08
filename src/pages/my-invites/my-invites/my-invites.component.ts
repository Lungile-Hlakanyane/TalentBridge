import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { InviteService } from '../../../services/invite-service/invite.service';
import { Invite } from '../../../models/Invite';
import { UserService } from '../../../services/User-Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-invites',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-invites.component.html',
  styleUrl: './my-invites.component.scss'
})
export class MyInvitesComponent implements OnInit {

  invites: Invite[] = [];
  filteredInvites: any[] = [];
  searchTerm: string = '';
  userId!: number;
  email: string = '';
  role: string = '';
  
  constructor(
    private location: Location,
    private inviteService: InviteService,
    private userService: UserService,
    private router: Router
  ) { }

  goBack() {    
    this.location.back(); 
  }

  ngOnInit() {
    this.loadUserData();
    this.loadInvites();
  }

 
  loadInvites() {
    if (!this.userId) return;
    this.inviteService.getInvitesForUser(this.userId).subscribe({
      next: (data) => {
        this.invites = data;
        this.filteredInvites = [];
        this.invites.forEach((invite) => {
          if (typeof invite.senderId === 'number') {
            this.userService.getUserById(invite.senderId).subscribe({
              next: (userData) => {
                if (userData.role === 'EMPLOYER') {
                  invite.displayName = `${userData.name} ${userData.surname}`;
                  invite.displayExtra = userData.companyName
                    ? `(${userData.companyName})`
                    : '';
                } else if (userData.role === 'EMPLOYEE') {
                  invite.displayName = `${userData.name} ${userData.surname}`;
                  invite.displayExtra = '';
                } else {
                  invite.displayName = 'Unknown User';
                  invite.displayExtra = '';
                }
                this.filteredInvites = [...this.invites];
              },
              error: (err) =>
                console.error(
                  `Failed to fetch sender details for ID ${invite.senderId}`,
                  err
                ),
            });
          } else {
            invite.displayName = 'Unknown User';
            invite.displayExtra = '';
          }
        });
      },
      error: (err) => console.error('Failed to fetch invites', err),
    });
  }

  respondToInvite(inviteId: number, action: 'ACCEPTED' | 'DECLINED') {
    this.inviteService.updateInviteStatus(inviteId, action).subscribe({
      next: () => this.loadInvites(),
      error: (err) => console.error('Failed to update invite status', err)
    });
  }

  acceptInvite(invite: Invite) {
    this.respondToInvite(invite.id, 'ACCEPTED');
  }

  declineInvite(invite: Invite) {
    this.respondToInvite(invite.id, 'DECLINED');
  }

  loadUserData() {
    const storedUserId = localStorage.getItem('userId');
    const storedEmail = localStorage.getItem('email');
    const storedRole = localStorage.getItem('role');
    if (storedUserId) this.userId = Number(storedUserId);
    if (storedEmail) this.email = storedEmail;
    if (storedRole) this.role = storedRole;
  }

  filterInvites() {
    const term = this.searchTerm.toLowerCase();
    this.filteredInvites = this.invites.filter(invite =>
      (invite.senderName?.toLowerCase().includes(term) ||
      invite.recipientEmail?.toLowerCase().includes(term))
    );
  }

  goTo(page: string) {
    this.router.navigateByUrl(page);
    console.log(`Navigate to ${page}`);
  }

}
