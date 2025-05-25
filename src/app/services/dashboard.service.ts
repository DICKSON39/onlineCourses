import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  role_name: string;
}

export interface Students {
  id: number;
  name: string;
  email: string;
  role_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl: string = 'https://elearning-f7yg.onrender.com/api/v1/dashboard';

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

  getStudents(): Observable<Students[]> {
    return this.http
      .get<{items:Students[]}>(`${this.apiUrl}/students`, {
      headers: this.getAuthHeaders(),
    })
      .pipe(
        map(response => response.items),
      )
  }



getTeachers(): Observable<Teacher[]> {
  return this.http
    .get<{ items: Teacher[] }>(`${this.apiUrl}/teachers`, {
      headers: this.getAuthHeaders(),
    })
    .pipe(
      map(response => response.items) // extract the array from 'items'
    );
}

}
