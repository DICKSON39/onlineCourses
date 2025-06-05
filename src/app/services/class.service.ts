import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Class {
  id: number;
  course: any;
  Description:string;
  title:string;
  videos: Video[];
  course_name: string;
}

interface Video {
  id: number;
  title: string;
  url: string;
}

interface CreateClassResponse {
  message: string;
  class: Class;
}

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  private apiUrl = `https://elearning-f7yg.onrender.com/api/v1/class`;

  constructor(private http: HttpClient) {}

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // 🔥 Accepts FormData instead of CreateClassPayload
  createClass(formData: FormData): Observable<CreateClassResponse> {
    return this.http.post<CreateClassResponse>(`https://elearning-f7yg.onrender.com/api/v1/create-class`, formData, {
      headers: this.getAuthHeaders(),
    });
  }

getTeacherClasses(): Observable<Class[]> {
  return this.http.get<Class[]>(
    `${this.apiUrl}/teacher`,
    { headers: this.getAuthHeaders() }
  );
}



  deleteClass(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateClass(classId: number, data: any) {
    return this.http.put(`${this.apiUrl}/${classId}`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  getMyPaidClasses():Observable<any>{
    return this.http.get(`https://elearning-f7yg.onrender.com/api/v1/mypaid-class` , {
      headers: this.getAuthHeaders(),
    })
  }
}
