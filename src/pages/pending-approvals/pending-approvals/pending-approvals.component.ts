import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PendingApproval } from '../../../models/PendingApproval';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pending-approvals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-approvals.component.html',
  styleUrl: './pending-approvals.component.scss'
})
export class PendingApprovalsComponent implements OnInit {

  pendingApprovals: PendingApproval[] = [];

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.loadMockPendingApprovals();
  }

   loadMockPendingApprovals(): void {
    this.pendingApprovals = [
      { id: 1, name: 'Alice Johnson', type: 'Candidate', email: 'alice@example.com', submittedDate: new Date('2025-08-15T10:30:00') },
      { id: 2, name: 'TechSoft Ltd', type: 'Employer', email: 'contact@techsoft.com', submittedDate: new Date('2025-08-16T14:45:00') },
      { id: 3, name: 'Frontend Developer', type: 'Job', submittedDate: new Date('2025-08-17T09:15:00') }
    ];
  }

  approve(id: number): void {
    alert(`Approval ID ${id} approved!`);
    this.pendingApprovals = this.pendingApprovals.filter(a => a.id !== id);
  }

  reject(id: number): void {
    alert(`Approval ID ${id} rejected!`);
    this.pendingApprovals = this.pendingApprovals.filter(a => a.id !== id);
  }

  goTo(path: string): void {
    this.router.navigate([`/admin/${path}`]);
  }

  goBack() {
    this.location.back();
  }

}
