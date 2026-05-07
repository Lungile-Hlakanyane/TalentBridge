import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopNavbarComponent } from '../../../re-usable-components/top-navbar/top-navbar.component';
import { UserService } from '../../../services/User-Service/user.service';
import { JobService } from '../../../services/Job-Service/job.service';
import { Job } from '../../../models/Job';
import { AnnouncementService } from '../../../app/announcement.service';
import { LoadingService } from '../../../services/Loading-Service/loading.service';
import { CookieBannerComponen } from '../../../re-usable-components/cookie-banner/cookie-banner/cookie-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TopNavbarComponent,CookieBannerComponen],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  announcements: any[] = [];
  userName: string = '';
  featuredJobs: Job[] = [ ]
  isMobile = false;
  showMenu = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private jobService: JobService,
    private announcementService:AnnouncementService,
    private loading:LoadingService
  ) {}

  ngOnInit() {
    this.isMobile = window.innerWidth <= 768;
    this.announcementService.getAllAnnouncements().subscribe({
      next: (response: any) => {
        this.announcements = response.map((announcement: any) => {
          return `${announcement.subject} - ${announcement.context}`;
        });
      },
      error: (err) => {
        console.error('Failed to load announcements:', err);
      }
    });

     
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUserById(+userId).subscribe({
        next: (res: any) => {
          this.userName = res.name || `${res.firstName} ${res.lastName}`; 
        },
        error: (err) => {
          console.error('Failed to fetch user details', err);
          this.userName = 'User';
        }
      });
    } else {
      this.userName = 'User';
    }

    this.jobService.getAllJobs().subscribe({
      next: (jobs: Job[]) => {
        const sortedJobs = jobs.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
        this.featuredJobs = sortedJobs.slice(0, 3);
      },
      error: (err) => console.error('Failed to fetch jobs', err)
    });
  }

  title = 'talentbridge';

  goTo(page: string) {
    this.router.navigateByUrl(page);
    console.log(`Navigate to ${page}`);
  }

  
  navigate(link:string){
    this.router.navigate([link]);
  }

 
  viewJob(id: number) {
    this.router.navigate(['/view-job', id]);
    console.log(`View job ${id}`);
  }

  toggleMenu() {
   this.showMenu = !this.showMenu;
  }

 logout() {
    this.loading.show();
    this.router.navigate(['/login']).then(() => {
      localStorage.clear();
      this.loading.hide();
    });
  }

}
