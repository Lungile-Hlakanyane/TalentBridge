import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { DashboardStats } from '../../../models/DashboardStats';
import { TopNavbarComponent } from '../../../re-usable-components/top-navbar/top-navbar.component';
import { JobService } from '../../../services/Job-Service/job.service';
import { UserService } from '../../../services/User-Service/user.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AnnouncementService } from '../../../app/announcement.service';
import { ApplicationService } from '../../../services/Application-Service/application.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, TopNavbarComponent, ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit{

 selectedIndex: number = -1;
 selectedUpdateId: number | null = null;

 isModalOpen = false;
  announcementForm = new FormGroup({
    subject: new FormControl('', Validators.required),
    context: new FormControl('', Validators.required)
  });

  get subject() { return this.announcementForm.get('subject'); }
  get context() { return this.announcementForm.get('context'); }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

 saveAnnouncement() {
  if (this.announcementForm.valid) {
    if (this.selectedUpdateId) {
      this.announcementSercice.updateAnnouncement(this.selectedUpdateId, this.announcementForm.value)
        .subscribe(response => {
          console.log(response);
          this.closeModal();
          this.announcementForm.reset();
          this.selectedUpdateId = null;
          this.loadUpdatesData(); // reload updates after editing
        }, error => {
          console.error(error);
        });
    } else {
      this.announcementSercice.createAnnouncement(this.announcementForm.value)
        .subscribe(response => {
          console.log(response);
          this.closeModal();
          this.announcementForm.reset();
          this.loadUpdatesData(); // reload updates after creating
        }, error => {
          console.error(error);
        });
    }
  }
}



adminName: string = 'Admin';
  stats: DashboardStats = {
    totalJobs: 0,
    totalEmployers: 0,
    totalCandidates: 0,
    totalApplications: 0,
    pendingApprovals: 0
  };

  recentActivity: string[] = [];
  recentUpdates: any [] = [];

  constructor(
    private router: Router,
    private jobService: JobService,
    private userService: UserService,
    private announcementSercice:AnnouncementService,
    private applicationService:ApplicationService
  ){}

  ngOnInit() {
    this.loadDashboardData();
    this.loadStats();
    this.loadUpdatesData();
    this.loadRecentActivity();
    this.loadApplicationCount();
  }


  loadDashboardData(): void {
    this.jobService.getAllJobs().subscribe({
      next: (jobs) => this.stats.totalJobs = jobs.length,
      error: (err) => console.error('Failed to load jobs:', err)
    });
    this.userService.getEmployerCount().subscribe({
      next: (count) => this.stats.totalEmployers = count,
      error: (err) => console.error('Failed to load employer count:', err)
    });
  }


loadUpdatesData(): void {
  this.announcementSercice.getAllAnnouncements().subscribe({
    next: (response: any) => {
      this.recentUpdates = response;
    },
    error: (err) => {
      console.error('Failed to load announcements:', err);
    }
  });
}


  goTo(page: string) {
    this.router.navigateByUrl(page);
    console.log(`Navigate to ${page}`);
  }

  loadStats() {
  this.userService.getEmployeeCount().subscribe({
    next: (count) => {
      this.stats.totalCandidates = count;
    },
    error: (err) => {
      console.error('Error fetching employee count:', err);
    }
  });
}

toggleMenu(index: number) {
  if (this.selectedIndex === index) {
    this.selectedIndex = -1;
  } else {
    this.selectedIndex = index;
  }
}

editUpdate(update: any) {
  this.announcementForm.patchValue({
    subject: update.subject,
    context: update.context
  });
  this.selectedUpdateId = update.id; // declare selectedUpdateId in your component
  this.openModal();
}


deleteUpdate(id: number) {
  this.announcementSercice.deleteAnnouncement(id).subscribe({
    next: () => {
      this.recentUpdates = this.recentUpdates.filter(update => update.id !== id);
      this.selectedIndex = -1;
    },
    error: (err) => {
      console.error('Failed to delete announcement:', err);
    }
  });
}


loadRecentActivity(): void {
    this.userService.getAllEmployers().subscribe({
        next: (employers: any[]) => {
            this.recentActivity = employers.map((employer: any) => {
                return `New employer "${employer.companyName}" registered`;
            });
        },
        error: (err) => console.error('Failed to load employers:', err)
    });
}

 loadApplicationCount() {
    this.applicationService.getApplicationCount().subscribe({
      next:(count)=>{
        this.stats.totalApplications=count;
      },
      error:(err)=>console.error('Error fetching application count:',err)
    });
  }


}
