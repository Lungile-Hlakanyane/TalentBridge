import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-industry-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './industry-selection.component.html',
  styleUrl: './industry-selection.component.scss'
})
export class IndustrySelectionComponent implements OnInit{

  industries: string[] = [
    'Information Technology',
    'Marketing',
    'Science',
    'Engineering',
    'Finance',
    'Healthcare',
    'Education',
    'Hospitality',
    'Construction',
    'Law'
  ];

  jobTypes: string[] = [
    'Fixed/Temporary',
    'Permanent Role',
    'Internships',
    'Learnerships'
  ];

  experienceLevels: string[] = [
    '0 - 1 Years',
    '1 - 2 Years',
    '2 - 3 Years',
    '3 - 5 Years',
    '5+ Years'
  ];

  constructor(private router:Router){}

  selectedIndustries: string[] = [];
  selectedJobTypes: string[] = [];
  selectedExperience: string[] = [];

  ngOnInit() {
    
  }

  toggleIndustry(industry: string) {
    if (this.selectedIndustries.includes(industry)) {
      this.selectedIndustries = this.selectedIndustries.filter(i => i !== industry);
    } else {
      this.selectedIndustries.push(industry);
    }
  }

  toggleJobType(type: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedJobTypes.push(type);
    } else {
      this.selectedJobTypes = this.selectedJobTypes.filter(t => t !== type);
    }
  }

  toggleExperience(exp: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedExperience.push(exp);
    } else {
      this.selectedExperience = this.selectedExperience.filter(e => e !== exp);
    }
  }

  skipSelection() {
    this.router.navigate(['/home']);
  }

  continue() {
    console.log('Selected Industries:', this.selectedIndustries);
    console.log('Selected Job Types:', this.selectedJobTypes);
    console.log('Selected Experience:', this.selectedExperience);
    this.router.navigate(['/home']);
  }

}
