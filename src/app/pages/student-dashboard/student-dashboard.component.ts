import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from '../../services/auth-services.service';
import { Router, RouterLink } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { ClassService } from '../../services/class.service'; // Import ClassService

@Component({
  selector: 'app-student-dashboard',
  imports: [ModalComponent,RouterLink, CommonModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit { // Implement OnInit
  showModal: boolean = false;
  isSidebarOpen: boolean = false;
  paidClasses: any[] = []; // To store the list of paid classes
  loadingClasses: boolean = true;
  classesError: string = '';

  constructor(
    private authService: AuthServicesService,
    private router: Router,
    private classService: ClassService // Inject ClassService
  ) {}

  ngOnInit(): void { // Use ngOnInit for initialization
    this.fetchPaidClasses();
  }

  fetchPaidClasses(): void {
    this.loadingClasses = true;
    this.classesError = '';
    this.classService.getMyPaidClasses().subscribe({
      next: (data) => {
        this.paidClasses = data;
        this.loadingClasses = false;
      },
      error: (err) => {
        console.error('Error fetching paid classes:', err);
        this.classesError = err.error?.message || 'Failed to load your paid classes.';
        this.loadingClasses = false;
      }
    });
  }

  logout() {
    this.showModal = true;
  }

  confirmLogout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

  cancelLogout(): void {
    this.showModal = false;
  }

  navigateToAvailableUsers() {
    this.router.navigate(['/admin/users']);
    this.closeSidebar();
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }
}
