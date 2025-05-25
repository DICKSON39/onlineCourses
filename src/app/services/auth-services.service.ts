import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

interface RegistrationResponse {
  message: string;
  user: any; // Define a more specific user interface
  accessToken: string;
}

interface User {
  id: string;
  username: string;
  roleName: string; // "Admin", "Teacher", or "Student"
  email: string;
  roleId: number;
  // Add any other properties specific to your user
}
interface inviteCode {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  roleId: number;
}

interface LoginResponse {
  message: string;
  user: any; // Define a more specific user interface
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthServicesService {
  // private apiUrl = `https://elearning-f7yg.onrender.com/api/v1/auth`;
  private apiUrl = `https://elearning-f7yg.onrender.com/api/v1/auth`;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(credentials: any): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          this.storeToken(response.accessToken);
          this.storeUser(response.user);
          // console.log('Stored user:', response.user); // Log stored user
        }),
      );
  }

  register(userData: any): Observable<RegistrationResponse> {
    return this.http
      .post<RegistrationResponse>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap((response) => this.storeToken(response.accessToken)),
        tap((response) => this.storeUser(response.user)),
      );
  }

  logout(): void {
    this.http
      .post(
        `${this.apiUrl}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.getToken()}`, // Attach the token for the backend to invalidate
          },
        },
      )
      .subscribe({
        next: (response) => {
          // console.log('Logged out successfully', response);
        },
        error: (error) => {
          console.error('Logout error', error);
        },
        complete: () => {
          // Remove token and user data from localStorage after the logout is successful
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          this.router.navigate(['']);
        },
      });
  }

  getUser(): User | null {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Removed duplicate implementation of isTokenExpired

  private storeToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  private storeUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Optional: Implement an expiry check if you have an expiry time for the token.
  public isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000; // Convert to milliseconds
      return Date.now() > expiry;
    } catch (error) {
      console.error('Token parsing failed:', error);
      return true; // Assume expired if parsing fails
    }
  }
}
