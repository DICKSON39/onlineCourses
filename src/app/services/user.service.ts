import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api/v1/users';
  constructor(private http: HttpClient) { }

  private getAuthHeaders():HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  }


  getUsers(): Observable<any[]> {
    const token = localStorage.getItem('access_token');
    return this.http.get<any[]>(`http://localhost:3000/api/v1/users/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  

  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}`,{
      headers:this.getAuthHeaders()});
  }

  updateUser(userId: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${userId}`, data,{
      headers:this.getAuthHeaders()});
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/v1/users/users/${userId}`,{
      headers:this.getAuthHeaders()});
  }

}
