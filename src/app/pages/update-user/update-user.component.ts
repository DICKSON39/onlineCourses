import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ModalComponent],
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  userForm!: FormGroup;
  userId!: number;
  user: any = {};
  showModal = false;
  roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Teacher' },
    { id: 3, name: 'Student' },
  ];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.buildForm();
    this.fetchUser();
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      roleId: ['', Validators.required], // Ensure this is populated with valid role IDs
      password: [''], // Include password if you're updating it as well
    });
  }

  fetchUser(): void {
    this.userService.getUserById(this.userId).subscribe((user) => {
      this.user = user; // Update this.user with the fetched user data
      this.userForm.patchValue(user); // Update the form values
    });
  }

  // Show modal for confirmation
  updateUser(): void {
    this.showModal = true; // Show modal for confirmation
  }

  // Handle the confirmation of update
  confirmUpdate(): void {
    const updatedUser = {
      ...this.user,
      ...this.userForm.value,
      roleId: Number(this.userForm.value.roleId), // 🔥 force numeric type
    };

    console.log('Payload to update:', updatedUser);

    if (updatedUser.password && updatedUser.password.length < 6) {
      this.snackBar.open('❌ Password must be at least 6 characters', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
      return;
    }

    // Proceed with the update
    this.userService.updateUser(updatedUser.id, updatedUser).subscribe(
      (response) => {
        console.log('Response from update:', response);
        this.snackBar.open('✅ User updated successfully', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success'],
        });
        this.router.navigate(['/admin/users']);
      },
      () => {
        this.snackBar.open('❌ Failed to update user', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
    );
    this.showModal = false; // Close modal after confirmation
  }

  // Handle cancellation of update
  cancelUpdate(): void {
    this.showModal = false; // Close modal without updating
  }
}
