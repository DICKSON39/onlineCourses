import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


interface Class {
  id: number;
  course: any;
  startTime: string;
  endTime: string;
  meetingLink?: string;
  videoPath?: string;

}

interface CreateClassPayload {
  courseId: number;
  startTime: string;
  endTime: string;
  meetingLink?: string;
  videoPath?: string;
}

interface CreateClassResponse {
  message: string;
  class: Class;
}
@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private apiUrl = `https://elearning-f7yg.onrender.com/api/v1/class`

  constructor(private http:HttpClient) { }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  createClass(payload: CreateClassPayload): Observable<CreateClassResponse> {
    return this.http.post<CreateClassResponse>(`${this.apiUrl}`, payload,{headers:this.getAuthHeaders()});
  }

  getClassesByTeacher(teacherId: string): Observable<any[]> {
    return this.http.get<any[]>(`https://elearning-f7yg.onrender.com/api/v1/class/teacher/${teacherId}`, { headers: this.getAuthHeaders() });
  }

  deleteClass(id:number) {
    return this.http.delete(`https://elearning-f7yg.onrender.com/api/v1/class/${id}`,{headers:this.getAuthHeaders()})
  }

  updateClass(classId: number, data: any) {
    return this.http.put(
      `https://elearning-f7yg.onrender.com/api/v1/class/${classId}`,
      data, // Send the data as the body of the request
      { headers: this.getAuthHeaders() } // Attach headers with the token
    );
  }

  getClassPaid(courseId: number, classId: number) {
    return this.http.post(
      'https://elearning-f7yg.onrender.com/api/v1/class/paid',
      { courseId, classId },
      { headers: this.getAuthHeaders() }
    );
  }




}
