import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role_name: string;
}

export interface TeacherDetail {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private baseUrl = 'http://localhost:3000/api/v1/teachers';

  constructor(private http: HttpClient) {}

  getAllTeachers(): Observable<User[]> {
    const token = localStorage.getItem('access_token'); // make sure this matches your AuthService key
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User[]>(this.baseUrl, { headers });
  }

  getTeacherById(teacherId:number):Observable<TeacherDetail[]> {
    const token = localStorage.getItem('access_token'); // make sure this matches your AuthService key
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<TeacherDetail[]>(`${this.baseUrl}/teachers/${teacherId}`,{headers});
  }

}
