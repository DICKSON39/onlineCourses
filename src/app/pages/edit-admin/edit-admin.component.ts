import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-admin',
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './edit-admin.component.html',
  styleUrl: './edit-admin.component.css',
})
export class EditAdminComponent implements OnInit {
  userForm!: FormGroup;
  userId!: number;
  user: any = {};
  showModal: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
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
