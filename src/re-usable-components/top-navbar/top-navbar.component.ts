import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.scss'
})
export class TopNavbarComponent implements OnInit {
  dropdownOpen = false;
  userRole: string | null = null;

  constructor(
    private location: Location,
    private router: Router
  ) { } 

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.dropdownOpen = false;
    this.router.navigate(['/login']);
  }

  goBack() {
    this.location.back();
  }

  navigate(link:string){
    this.router.navigate([link]);
  }


  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-dropdown')) {
      this.dropdownOpen = false;
    }
  }

}
