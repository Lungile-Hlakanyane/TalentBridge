import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {

  stats: any[] = [
    { value: '10k+', label: 'Candidates Placed' },
    { value: '500+', label: 'Partner Companies' },
    { value: '14 days', label: 'Avg. Time to Hire' }
  ];


  features: any[] = [
    {
      title: 'For Job Seekers',
      desc: 'Get matched to roles that fit your skills + goals. Real feedback, no black holes.',
      icon: 'person'
    },
    {
      title: 'For Employers',
      desc: 'Pre-vetted candidates delivered in days, not months. Cut hiring costs by 60%.',
      icon: 'business'
    },
    {
      title: 'For Recruiters',
      desc: 'Powerful tools to source, track, and place talent. All in one dashboard.',
      icon: 'bolt'
    }
  ];

  ngOnInit(): void {}

  constructor(
    private location:Location
  ){}

  goBack(){
    this.location.back();
  }

}
