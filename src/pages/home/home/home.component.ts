import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopNavbarComponent } from '../../../re-usable-components/top-navbar/top-navbar.component';
import { UserService } from '../../../services/User-Service/user.service';
import { JobService } from '../../../services/Job-Service/job.service';
import { Job } from '../../../models/Job';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TopNavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  userName: string = '';
  featuredJobs: Job[] = [ ]

  constructor(
    private router: Router,
    private userService: UserService,
    private jobService: JobService
  ) {}

  ngOnInit() {
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


  announcements = [
    'New job postings every Monday!',
    'Update your profile to get better matches'
  ];

  title = 'talentbridge';

  goTo(page: string) {
    this.router.navigateByUrl(page);
    console.log(`Navigate to ${page}`);
  }

  viewJob(id: number) {
    this.router.navigate(['/view-job', id]);
    console.log(`View job ${id}`);
  }

}
