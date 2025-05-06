import { Component } from '@angular/core';
import { AuthServicesService } from '../../services/auth-services.service';
import { Router, RouterLink } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports:[ModalComponent,RouterLink]
})
export class AdminDashboardComponent {
  showModal: boolean = false;

  constructor(private authService: AuthServicesService, private router: Router) {}

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
  }
}
