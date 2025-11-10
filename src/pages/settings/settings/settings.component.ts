import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/User-Service/user.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
   standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit{

   // === Privacy & Visibility ===
  hideActive: boolean = false;
  showLastSeen: boolean = true;
  profileVisibility: string = 'public';

  // === Communication & Messaging ===
  allowInvites: boolean = true;
  messageNotifications: boolean = true;
  blockUnconnected: boolean = false;

  // === Notifications ===
  emailNotifications: boolean = true;
  jobAlerts: boolean = true;
  announcementAlerts: boolean = true;

  // === Display & Accessibility ===
  darkMode: boolean = false;
  fontSize: string = 'medium';

  // === Account & Security ===
  twoFactorAuth: boolean = false;

  constructor(
    private router:Router,
    private location: Location,
    private userService: UserService
  ){}

  goBack(){
    this.location.back();
  }

  navigate(link: string){
    this.router.navigateByUrl(link);
  }

  ngOnInit(): void {
    this.loadSettings();
  }

  onSelectChange(settingName: string): void {
    this.saveSettings();
  }

  loadSettings(): void {
    const savedSettings = localStorage.getItem('talentBridgeSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      Object.assign(this, parsed);
    }
  }


  saveSettings(): void {
    const settings = {
      hideActive: this.hideActive,
      showLastSeen: this.showLastSeen,
      profileVisibility: this.profileVisibility,
      allowInvites: this.allowInvites,
      messageNotifications: this.messageNotifications,
      blockUnconnected: this.blockUnconnected,
      emailNotifications: this.emailNotifications,
      jobAlerts: this.jobAlerts,
      announcementAlerts: this.announcementAlerts,
      darkMode: this.darkMode,
      fontSize: this.fontSize,
      twoFactorAuth: this.twoFactorAuth
    };
    localStorage.setItem('talentBridgeSettings', JSON.stringify(settings));
  }

  onToggleChange(settingName: string): void {
    (this as any)[settingName] = !(this as any)[settingName];
    this.saveSettings();
  }

  changePassword(): void {
    this.router.navigateByUrl('/forgot-password');
  }

 deleteAccount(): void {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      alert('User not found.');
      return;
    }
    this.userService.deleteAccount(userId).subscribe({
      next: (res) => {
        alert(res);
        localStorage.clear(); // remove all user data
        this.router.navigate(['/login']); // redirect to login
      },
      error: (err) => {
        console.error('Error deleting account:', err);
        alert('Failed to delete account. Please try again.');
      }
    });
  }
}

}
