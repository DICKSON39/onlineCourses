import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  roleId: number;
  roleName?: string; // This will hold the readable name
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user.component.html',
  imports: [CommonModule, RouterLink,ModalComponent,FormsModule],
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  showModal: boolean = false;
  selectedUserId!: number;
  userSearchTerm: string = '';

  constructor(private http: HttpClient, private userService: UserService, private snackBar: MatSnackBar, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers() // adjust URL if needed
      .subscribe((users) => {
        this.users = users.map(user => ({
          ...user,
          roleName: this.getRoleName(user.roleId)
        }));
      });
  }

  getRoleName(roleId: number): string {
    switch (roleId) {
      case 1: return 'Admin';
      case 2: return 'Teacher';
      case 3: return 'Student';
      default: return 'Unknown';
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
          this.fetchUsers(); // Refresh the user list after deletion
        },
        error: () => {
          this.snackBar.open('❌ Failed to delete user', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
          });
        }
      });
    }
    this.showModal = false;
  }

  cancelDelete(): void {
    this.showModal = false;
  }

  get filteredUsers() {
    const term = this.userSearchTerm.toLowerCase();
    return this.users.filter(user =>
      user.name?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.phoneNumber?.toLowerCase().includes(term) ||
      user.roleName?.toLowerCase().includes(term)
    );
  }  
}
