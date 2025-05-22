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

interface LatestPaidClassInfo {
  class_id: number; // Matches the alias from the SQL query
  courseId: number;
}

interface PaidClassListItem { // New interface for the list of paid classes
  class_id: number;
  startTime: string;
  endTime: string;
  meetingLink?: string;
  videoPath?: string;
  courseId: number;
  isLive: boolean;
  course_name: string;
  course_description: string;
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

  constructor(private http: HttpClient) {
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  createClass(payload: CreateClassPayload): Observable<CreateClassResponse> {
    return this.http.post<CreateClassResponse>(`${this.apiUrl}`, payload, {headers: this.getAuthHeaders()});
  }

  getClassesByTeacher(teacherId: string): Observable<any[]> {
    return this.http.get<any[]>(`https://elearning-f7yg.onrender.com/api/v1/class/class/teacher/${teacherId}`, {headers: this.getAuthHeaders()});
  }

  deleteClass(id: number) {
    return this.http.delete(`https://elearning-f7yg.onrender.com/api/v1/class/class/${id}`, {headers: this.getAuthHeaders()})
  }

  updateClass(classId: number, data: any) {
    return this.http.put(
      `https://elearning-f7yg.onrender.com/api/v1/class/class/${classId}`,
      data, // Send the data as the body of the request
      {headers: this.getAuthHeaders()} // Attach headers with the token
    );
  }

  getClassPaid(courseId: number, classId: number) {
    return this.http.post(
      `${this.apiUrl}class/paid`, // Use apiUrl variable here
      {courseId, classId},
      {headers: this.getAuthHeaders()}
    );
  }

  // NEW METHOD: To fetch the details of the single latest paid class
  getLatestPaidClass(): Observable<LatestPaidClassInfo> {
    return this.http.get<LatestPaidClassInfo>(`${this.apiUrl}/class/latest-paid`, {headers: this.getAuthHeaders()});


  }
}

