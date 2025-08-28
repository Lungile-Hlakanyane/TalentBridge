import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private router: Router){}

  ngOnInit() {}

  userName = 'Lungile Hlakanyane';

  featuredJobs = [
    { title: 'Frontend Developer', company: 'TechCorp', id: 1 },
    { title: 'UI/UX Designer', company: 'Designify', id: 2 },
    { title: 'Backend Engineer', company: 'CodeWorks', id: 3 }
  ];

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
