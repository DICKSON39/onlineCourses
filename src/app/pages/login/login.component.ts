import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServicesService } from '../../services/auth-services.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  showSuccessModal = false;
  showErrorModal = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServicesService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
         // console.log('Full Response:', res);

          const roleId = res.user?.roleId;

          if (!roleId) {
            this.errorMessage = 'Role ID is missing in the response';
            this.showErrorModal = true;
            return;
          }

          this.showSuccessModal = true;

          setTimeout(() => {
            let route = '';
            switch (roleId) {
              case 1:
                route = '/courses/admin';
                break;
              case 2:
                route = '/courses/teacher';
                break;
              case 3:
                route = '/courses/student';
                break;
              default:
                this.errorMessage = 'Unknown role ID';
                this.showErrorModal = true;
                return;
            }

            //console.log('Redirecting to route:', route);
            this.router.navigate([route]).then(() => {
              //console.log('Navigation done');
            });
          }, 1500);
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Login failed';
          this.showErrorModal = true;
          console.error('Login error', error);
        },
      });
    }
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  closeErrorModal() {
    this.showErrorModal = false;
  }

  navigateToSignUp() {
    this.router.navigate(['/courses/register']);
  }
}
