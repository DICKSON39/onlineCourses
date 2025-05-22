import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-payments',
  imports: [CommonModule],
  templateUrl: './my-payments.component.html',
  styleUrl: './my-payments.component.css',
})
export class MyPaymentsComponent implements OnInit {
  constructor(private paymentService: PaymentService) {}

  allPayments: any[] = [];
  errorMessage = '';

  ngOnInit(): void {
    this.paymentService.getStudentPayments().subscribe({
      next: (payments) => (this.allPayments = payments),
      error: (err) => {
        console.error('Error fetching all payments', err);
        this.errorMessage = 'Failed to load your payment history.';
      },
    });
  }
}
