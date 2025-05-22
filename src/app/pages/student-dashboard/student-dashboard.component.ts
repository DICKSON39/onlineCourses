import { Component, OnInit } from '@angular/core'; // Import OnInit
import { AuthServicesService } from '../../services/auth-services.service';
import { Router, RouterLink } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngClass
import { ClassService } from '../../services/class.service'; // Import ClassService

@Component({
  selector: 'app-student-dashboard',
  // If this is an Angular 14+ standalone component, add 'standalone: true'
  // standalone: true,
  imports: [ModalComponent,RouterLink, CommonModule], // Add CommonModule here
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit { // Implement OnInit
  showModal: boolean = false;
  isSidebarOpen: boolean = false;

  // New properties to hold the classId and courseId for the "Join Classes" button
  defaultClassId: number | null = null;
  defaultCourseId: number | null = null;
  loadingClassLink: boolean = true;
  classLinkError: string = '';

  constructor(
    private authService:AuthServicesService,
    private router:Router,
    private classService: ClassService // Inject ClassService
  ) {}

  ngOnInit(): void { // Use ngOnInit for initialization logic
    this.fetchDefaultPaidClassLink();
  }

  fetchDefaultPaidClassLink(): void {
    this.loadingClassLink = true;
    this.classLinkError = '';
    this.classService.getLatestPaidClass().subscribe({
      next: (data) => {
        this.defaultClassId = data.class_id;
        this.defaultCourseId = data.courseId;
        this.loadingClassLink = false;
      },
      error: (err) => {
        console.error('Error fetching default paid class link:', err);
        this.classLinkError = err.error?.message || 'Could not load a class to join. Please try again.';
        this.loadingClassLink = false;
      }
    });
  }

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
    // This method seems to navigate to admin users, which might be incorrect for a student dashboard.
    // Assuming it's a placeholder or intended for a specific cross-role scenario.
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
