import { Component,OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-payments',
  imports: [CommonModule,FormsModule],
  templateUrl: './show-payments.component.html',
  styleUrl: './show-payments.component.css'
})
export class ShowPaymentsComponent implements OnInit {
  payments: any[] = [];
  searchTerm: string = '';


  constructor(private paymentService: PaymentService) {}
  
  ngOnInit(): void {
    this.loadAllPayments();
  }
  
  loadAllPayments(): void {
    this.paymentService.getAllPayments().subscribe({
      next: (data) => (this.payments = data),
      error: (err) => console.error('Failed to fetch payments:', err)
    });
  }

  get filteredPayments() {
    if (!this.searchTerm) return this.payments;
  
    const term = this.searchTerm.toLowerCase();
  
    return this.payments.filter(payment =>
      payment.userName.toLowerCase().includes(term) ||
      payment.userEmail.toLowerCase().includes(term) ||
      payment.courseTitle.toLowerCase().includes(term) ||
      payment.status.toLowerCase().includes(term)
    );
  }
  
  


}
