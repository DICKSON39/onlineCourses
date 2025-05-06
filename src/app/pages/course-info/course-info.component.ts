import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../model/course.model';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../../services/teacher.service';
import { switchMap, of } from 'rxjs';
import { PaymentService } from '../../services/payment.service';

// src/app/model/teacher.model.ts
export interface Teacher {
  id: number;
  name: string;
  email: string;
  // ... other properties if any
}

@Component({
  selector: 'app-course-info',
  imports: [CommonModule],
  templateUrl: './course-info.component.html',
  styleUrl: './course-info.component.css'
})
export class CourseInfoComponent implements OnInit {
  courseId: number | null = null;
  course: Course | null = null;
  errorMessage: string = '';
  backendBaseUrl: string = 'http://localhost:3000';
  teacherName: string = '';
  selectedCourseId!: number;
selectedCoursePrice!: number;
showModal = false;
paymentHistory: any[] = [];


confirmPayment(courseId: number, price: number): void {
  this.selectedCourseId = courseId;
  this.selectedCoursePrice = price;
  this.showModal = true;
}

loadPaymentHistory(): void {
  if (this.courseId) {
    this.paymentService.getStudentPayments(this.courseId).subscribe({
      next: (history) => (this.paymentHistory = history),
      error: (err) => console.error('Failed to load history:', err),
    });
  }
}




  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);
  private teacherService = inject(TeacherService);
  
  constructor(private paymentService: PaymentService) { }



  ngOnInit(): void {
    

    this.route.params.subscribe((params) => {
      this.courseId = +params['id'];
      if (this.courseId) {
        this.fetchCourseDetails(this.courseId);
      }
      this.loadPaymentHistory(); // Load payment history on init
    });
  }

  fetchCourseDetails(id: number): void {
    this.courseService.getCourseById(id).pipe(
      switchMap(courseFromBackend => {
        this.course = {
          id: courseFromBackend.id,
          title: courseFromBackend.title,
          description: courseFromBackend.description,
          price: courseFromBackend.price,
          teacherId: courseFromBackend.teacherId,
          imageUrl: this.backendBaseUrl + (courseFromBackend.imageUrl || ''), // Check this line
        };
        if (this.course.teacherId) {
          return this.teacherService.getTeacherById(this.course.teacherId);
        } else {
          return of(null);
        }
      })
    ).subscribe({
      next: (teacher) => {
        this.teacherName = teacher && teacher.length > 0 ? teacher[0].name : 'N/A';
      },
      error: (error) => {
        console.error('Error fetching course or teacher details:', error);
        this.errorMessage = 'Failed to load course details.';
        if (error.status === 404) {
          this.errorMessage = 'Course not found.';
        }
      }
    });
  }
  handlePayment(courseId: number, price: number): void {
    this.paymentService.makePayment(courseId, price,1).subscribe({
      next: (response) => {
        alert('✅ Payment successful!');
        // You can also navigate or update state here
      },
      error: (err) => {
        console.error('❌ Payment error:', err);
        alert(err?.error?.message || 'Payment failed');
      },
    });
  }

  handleConfirmedPayment(): void {
    this.paymentService.makePayment(this.selectedCourseId, this.selectedCoursePrice,1).subscribe({
      next: () => {
        alert('✅ Payment successful!');
        this.showModal = false;
        this.loadPaymentHistory(); // Refresh if showing history
      },
      error: (err) => {
        alert(err.error?.message || 'Payment failed');
        this.showModal = false;
      },
    });
  }
  

}