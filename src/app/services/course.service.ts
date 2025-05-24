import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
interface Course {
  imageUrl: string;
  id: number;
  title: string;
  description: string;
  teacherName: string;
  roleName: string;
  image: string;
  price: number;
  teacherId: number;
  // Add other properties as needed
}
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/api/v1/courses';
  private baseUrl = 'http://localhost:3000/api/v1/teachers';
  constructor(private http: HttpClient) {}

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  createCourse(courseData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, courseData, {
      headers: this.getAuthHeaders(),
    });
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl); // Assuming your backend returns an array of courses
  }

  getAllCourseWithTeachers(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses`);
  }

  getCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/courses/${courseId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getTeacherCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/teacher/my-courses`, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/courses/${courseId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateCourse(courseId: number, formData: FormData): Observable<any> {
    return this.http.put(
      `http://localhost:3000/api/v1/courses/courses/${courseId}`,
      formData,
      {
        headers: this.getAuthHeaders(),
      },
    );
  }
}
