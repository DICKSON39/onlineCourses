// src/app/components/course-info/course-info.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../model/course.model';
import { CommonModule, NgIf } from '@angular/common'; // Import NgIf
import { TeacherService } from '../../services/teacher.service';
import { switchMap, of } from 'rxjs';

import {
  loadStripe,
  Stripe,
  StripeElements,
  StripeCardElement,
} from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-course-info',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf], // Add FormsModule and NgIf
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css'],
})
export class CourseInfoComponent implements OnInit {
  courseId: number | null = null;
  course: Course | null = null;
  errorMessage: string = '';
  backendBaseUrl: string = 'https://elearning-f7yg.onrender.com';
  teacherName: string = '';
  selectedCourseId!: number;
  selectedCoursePrice!: number;
  showModal = false;
  paymentHistory: any[] = [];

  // M-Pesa specific
  selectedPaymentMethod: 'stripe' | 'mpesa' = 'stripe'; // Default to Stripe
  mpesaPhoneNumber: string = '';

  // Stripe specific
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;
  isProcessingPayment = false;

  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);
  private teacherService = inject(TeacherService);

  constructor(
    private paymentService: PaymentService,
    private toastr: ToastrService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.stripe = await loadStripe(
      'pk_test_51RO0lO2cCqKNtuUREQ3BtS6covRzAQvM71uLNsgNBVTTBdzQASkCtgCwlnncCzhWHTpf2ICS7pORY64ONUPQYANP00jPXyi8FU',
    );

    this.route.params.subscribe((params) => {
      this.courseId = +params['id'];
      if (this.courseId) {
        this.fetchCourseDetails(this.courseId);
        this.loadPaymentHistory();
      }
    });
  }

  fetchCourseDetails(id: number): void {
    this.courseService
      .getCourseById(id)
      .pipe(
        switchMap((courseFromBackend) => {
          this.course = {
            id: courseFromBackend.id,
            title: courseFromBackend.title,
            description: courseFromBackend.description,
            price: courseFromBackend.price,
            teacherId: courseFromBackend.teacherId,
            imageUrl: this.backendBaseUrl + (courseFromBackend.imageUrl || ''),
          };
          if (this.course.teacherId) {
            return this.teacherService.getTeacherById(this.course.teacherId);
          } else {
            return of(null);
          }
        }),
      )
      .subscribe({
        next: (teacher) => {
          this.teacherName =
            teacher && teacher.length > 0 ? teacher[0].name : 'N/A';
        },
        error: (error) => {
          console.error('Error fetching course or teacher details:', error);
          this.errorMessage =
            error.status === 404
              ? 'Course not found.'
              : 'Failed to load course details.';
        },
      });
  }

  loadPaymentHistory(): void {
    if (this.courseId) {
      this.paymentService.getStudentPayments(this.courseId).subscribe({
        next: (history) => (this.paymentHistory = history),
        error: (err) => console.error('Failed to load history:', err),
      });
    }
  }

  async startPaymentFlow(courseId: number, price: number) {
    this.selectedCourseId = courseId;
    this.selectedCoursePrice = price;

    const alreadyPaid = this.paymentHistory.some(
      (p) => p.courseId === courseId && p.status === 'paid',
    );

    if (alreadyPaid) {
      this.toastr.info('You have already paid for this course.');
      return;
    }

    this.showModal = true;

    // Only set up Stripe card if 'stripe' is the selected method
    if (this.selectedPaymentMethod === 'stripe') {
      await new Promise((res) => setTimeout(res, 0)); // Wait for modal to render
      if (!this.elements && this.stripe) {
        this.elements = this.stripe.elements();
      }
      if (this.card) {
        this.card.unmount();
      }
      if (this.elements) {
        this.card = this.elements.create('card');
        this.card.mount('#card-element');
      }
    }
  }

  async handleConfirmedPayment(): Promise<void> {
    this.isProcessingPayment = true;

    try {
      if (this.selectedPaymentMethod === 'stripe') {
        if (!this.stripe || !this.card) {
          this.toastr.error('Stripe not ready.');
          this.showModal = false;
          return;
        }

        // Step 1: Request backend to create a payment intent (for Stripe)
        const response = await this.paymentService
          .makePayment(this.selectedCourseId, this.selectedCoursePrice)
          .toPromise();

        const clientSecret = response?.clientSecret;

        if (!clientSecret) {
          this.toastr.error('Missing client secret. Try again later.');
          this.showModal = false;
          return;
        }

        // Step 2: Confirm card payment with Stripe
        const result = await this.stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: this.card },
        });

        if (result.error) {
          this.toastr.error(result.error.message || 'Payment failed');
        } else if (result.paymentIntent?.status === 'succeeded') {
          this.paymentService
            .confirmPayment(this.selectedCourseId, result.paymentIntent.id)
            .subscribe({
              next: () => {
                this.toastr.success('Payment successful!');
                this.showModal = false;
                this.loadPaymentHistory();
              },
              error: (err) => {
                console.error('DB Save Error:', err);
                this.toastr.warning('Payment succeeded, but saving failed.');
                this.showModal = false;
              },
            });
        }
      } else if (this.selectedPaymentMethod === 'mpesa') {
        if (!this.mpesaPhoneNumber) {
          this.toastr.error('Please enter your M-Pesa phone number.');
          this.isProcessingPayment = false;
          return;
        }

        // Initiate M-Pesa STK Push
        this.paymentService
          .initiateMpesaPayment(this.selectedCourseId, this.mpesaPhoneNumber)
          .subscribe({
            next: (res) => {
              this.toastr.info('M-Pesa STK Push initiated. Check your phone.');
              this.showModal = false;
              // You might want to periodically check payment status here or rely on the M-Pesa callback
              // For simplicity, we just close the modal after initiation.
            },
            error: (err) => {
              console.error('M-Pesa initiation error:', err);
              this.toastr.error(
                'Failed to initiate M-Pesa payment: ' +
                  (err.error?.message || err.message),
              );
            },
          });
      }
    } catch (err: any) {
      console.error('Payment Error:', err);
      this.toastr.error('Unexpected error: ' + err.message);
    } finally {
      this.isProcessingPayment = false;
    }
  }
}
