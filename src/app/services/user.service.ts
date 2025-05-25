// src/app/services/user.service.ts
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Define the User interface and EXPORT it
export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  roleId: number;
  roleName?: string; // This will hold the readable name
}

// Define an interface for the paginated response, matching your backend's expected structure
export interface PaginatedUsers {
  items: User[]; // Now explicitly uses the exported User interface
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://elearning-f7yg.onrender.com/api/v1/users';
  private usersListUrl = 'https://elearning-f7yg.onrender.com/api/v1/users/users';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getUsers(
    page: number,
    pageSize: number,
    searchTerm: string = '',
  ): Observable<PaginatedUsers> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }

    return this.http.get<PaginatedUsers>(this.usersListUrl, {
      headers: this.getAuthHeaders(),
      params: params,
    });
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateUser(userId: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${userId}`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${userId}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
