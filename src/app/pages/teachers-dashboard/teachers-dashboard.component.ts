import { Component } from '@angular/core';
import { AuthServicesService } from '../../services/auth-services.service';
import { Router, RouterLink } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngClass

@Component({
  selector: 'app-teachers-dashboard',
  imports: [ModalComponent,RouterLink, CommonModule], // Add CommonModule here
  templateUrl: './teachers-dashboard.component.html',
  styleUrl: './teachers-dashboard.component.css'
})
export class TeachersDashboardComponent {
  showModal: boolean = false;
  isSidebarOpen: boolean = false; // New property to control sidebar visibility

  constructor( private authService:AuthServicesService, private router:Router) {}

  logout() {
    this.showModal = true;  // Show the modal for confirmation
  }

  confirmLogout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

  cancelLogout(): void {
    this.showModal = false;  // Hide the modal if canceled
  }

  navigateToAvailableUsers() {
    this.router.navigate(['/admin/users']);
    this.closeSidebar(); // Close sidebar after navigation on mobile
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
