import { Component } from '@angular/core';
import { AuthServicesService } from '../../services/auth-services.service';
import { Router, RouterLink } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngClass

@Component({
  selector: 'app-student-dashboard',
  imports: [ModalComponent, RouterLink, CommonModule], // Add CommonModule here
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css',
})
export class StudentDashboardComponent {
  showModal: boolean = false;
  isSidebarOpen: boolean = false; // Renamed for consistency and clarity

  constructor(
    private authService: AuthServicesService,
    private router: Router,
  ) {}

  logout() {
    this.showModal = true; // Show the modal for confirmation
  }

  confirmLogout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

  cancelLogout(): void {
    this.showModal = false; // Hide the modal if canceled
  }

  // New method to toggle sidebar visibility
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // New method to close sidebar
  closeSidebar(): void {
    this.isSidebarOpen = false;
  }
}
