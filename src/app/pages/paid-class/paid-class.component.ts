import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from '../../services/class.service';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // adjust path if needed

@Component({
  selector: 'app-paid-class',
  templateUrl: './paid-class.component.html',
  styleUrls: ['./paid-class.component.css'],
  imports: [CommonModule,FormsModule,ReactiveFormsModule]
})
export class PaidClassComponent implements OnInit {
  classId!: number;
  courseId!: number;
  classData: any;
  errorMsg = '';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private classService: ClassService
  ) {}

  ngOnInit(): void {
    this.classId = +this.route.snapshot.paramMap.get('classId')!;
    this.courseId = +this.route.snapshot.queryParamMap.get('courseId')!;

    this.classService.getClassPaid(this.courseId, this.classId).subscribe({
      next: (data) => {
        this.classData = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = err.error.message || 'Something went wrong';
        this.loading = false;
      }
    });
  }
}
