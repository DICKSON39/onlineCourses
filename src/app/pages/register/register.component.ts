import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServicesService } from '../../services/auth-services.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  showSuccessModal: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthServicesService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{7,15}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      roleId: [3], // keep roleId for students by default
      inviteCode: [''], // <---- added inviteCode here, optional
      agreeTerms: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  navigateToLogin() {
    this.router.navigate(['/courses/login']);
  }

  onSubmit(): void {
    if (this.registerForm.valid) {

      // Prepare registration data
      const registrationData: any = {
        name: this.registerForm.get('name')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        phoneNumber: this.registerForm.get('phoneNumber')?.value,
        roleId: this.registerForm.get('roleId')?.value,
      };

      const inviteCode = this.registerForm.get('inviteCode')?.value;
      if (inviteCode && inviteCode.trim() !== '') {
        registrationData.inviteCode = inviteCode.trim(); // add invite code only if present
      }

      this.authService.register(registrationData).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.showSuccessModal = true;
          this.registerForm.reset();
        },
        error: (error) => {
          this.errorMessage =
            error.error.message || 'Registration failed';
          console.error('Registration error', error);
        },
      });
    }
  }

  closeModal() {
    this.showSuccessModal = false;
    this.navigateToLogin();
  }
}
