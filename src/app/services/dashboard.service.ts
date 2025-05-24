import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Dashboard {
  totalUsers: number;
  totalPayments: number;
  totalCourses: number;
  totalClasses: number;
  totalEnrolled: bigint;
  totalTeachers: number;
  totalStudents: number;
}

export interface Teacher {
  id: number;
  name: string;
  email: string;
  roleName: string;
}

export interface Students {
  id: number;
  name: string;
  email: string;
  roleName: string;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl: string = 'http://localhost:3000/api/v1/dashboard';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getStats(): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.apiUrl}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getStudents(): Observable<Students> {
    return this.http.get<Students>(`${this.apiUrl}/students`, {
      headers: this.getAuthHeaders(),
    });
  }

  getTeachers(): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/teachers`, {
      headers: this.getAuthHeaders(),
    });
  }
}
