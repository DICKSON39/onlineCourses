import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, NgModel } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  roleId: number;
  roleName?: string; // This will hold the readable name
}
@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const userId = +this.route.snapshot.paramMap.get('id')!;
    this.getUserById(userId);
  }

  getUserById(userId: number) {
    this.userService.getUserById(userId).subscribe((data) => {
      this.user = data;
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
}
