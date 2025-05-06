import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl ='http://localhost:3000/api/v1/payment';

 

  constructor(private http:HttpClient) { }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  makePayment(courseId:number,amount:number,userId:number):Observable<any> {
    const body = {
      courseId,amount,userId
    };

    return this.http.post(`${this.apiUrl}/${userId}/payment`,body, {
      headers: this.getAuthHeaders()})
    
  }


  getPayments(userId:number):Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}/payments`, {
      headers: this.getAuthHeaders()
    });
  }

  getStudentPayments(courseId?: number): Observable<any[]> {
    let url = `${this.apiUrl}/my-payments`;
    if (courseId) {
      url += `?courseId=${courseId}`;
    }
  
    return this.http.get<any[]>(url, {
      headers: this.getAuthHeaders()
    });
  }

  getAllPayments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/payment-info`, {
      headers: this.getAuthHeaders(),
    });
  }
  

}
