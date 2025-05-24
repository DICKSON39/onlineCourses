// src/app/components/user-list/user.component.ts
import { Component,  OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserService, PaginatedUsers, User } from '../../services/user.service'; // Import PaginatedUsers
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'; // For search optimization
import { Subject } from 'rxjs'; // For search optimization

@Component({
  selector: 'app-user-list',
  templateUrl: './user.component.html',

  imports: [CommonModule, RouterLink, ModalComponent, FormsModule],
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  showModal: boolean = false;
  selectedUserId!: number;

  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 10; // Number of items per page
  totalItems: number = 0;
  totalPages: number = 0;

  userSearchTerm: string = '';
  private searchSubject = new Subject<string>(); // Subject for debounced search

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.fetchUsers();

    // Set up debounced search
    this.searchSubject
      .pipe(
        debounceTime(300), // Wait for 300ms after the last keystroke
        distinctUntilChanged(), // Only emit if the current value is different from the last
      )
      .subscribe(() => {
        this.currentPage = 1; // Reset to first page on new search
        this.fetchUsers();
      });
  }

  fetchUsers(): void {
    this.userService
      .getUsers(this.currentPage, this.pageSize, this.userSearchTerm)
      .subscribe((paginatedData: PaginatedUsers) => {
        this.users = paginatedData.items.map((user) => ({
          ...user,
          roleName: this.getRoleName(user.roleId),
        }));
        this.totalItems = paginatedData.totalItems;
        this.totalPages = paginatedData.totalPages;
      });
  }

  getRoleName(roleId: number): string {
    switch (roleId) {
      case 1:
        return 'Admin';
      case 2:
        return 'Teacher';
      case 3:
        return 'Student';
      default:
        return 'Unknown';
    }
  }

  deleteUser(userId: number) {
    this.selectedUserId = userId;
    this.showModal = true;
  }

  confirmDelete(): void {
    if (this.selectedUserId) {
      this.userService.deleteUser(this.selectedUserId).subscribe({
        next: () => {
          this.snackBar.open('✅ User deleted successfully', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          });
          // After deletion, re-fetch users, possibly adjusting current page if the last item on a page was deleted
          if (this.users.length === 1 && this.currentPage > 1) {
            this.currentPage--; // Go to previous page if the last item on current page was deleted
          }
          this.fetchUsers();
        },
        error: () => {
          this.snackBar.open('❌ Failed to delete user', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
          });
        },
      });
    }
    this.showModal = false;
  }

  cancelDelete(): void {
    this.showModal = false;
  }

  // --- Pagination Methods ---

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.fetchUsers();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchUsers();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchUsers();
    }
  }

  onPageSizeChange(event: Event): void {
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.currentPage = 1; // Reset to first page when page size changes
    this.fetchUsers();
  }

  onSearchTermChange(event: Event): void {
    this.userSearchTerm = (event.target as HTMLInputElement).value;
    this.searchSubject.next(this.userSearchTerm); // Emit search term to the subject
  }
}
