import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from '../../services/auth-services.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { User, UserService } from '../../services/user.service';
import { ReactiveFormsModule } from '@angular/forms'; // Import CommonModule for ngClass

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [ModalComponent, RouterLink, CommonModule, ReactiveFormsModule], // Add CommonModule here
  standalone: true,
})
export class AdminDashboardComponent implements OnInit {
  showModal: boolean = false;
  isSidebarOpen: boolean = false; // New property to control sidebar visibility
  users: User[] = [];
  userId!: number;

  constructor(
    private userService: UserService,
    private authService: AuthServicesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchUser();
  }

  fetchUser(): void {
    this.userService.getUserById(this.userId).subscribe((user) => {
      this.users = user; // Update this.user with the fetched user data
    });
  }

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
