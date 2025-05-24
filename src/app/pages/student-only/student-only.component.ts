import { Component } from '@angular/core';
import {  DashboardService } from '../../services/dashboard.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

class Student {
  name: string | undefined;
  email: string | undefined;
  roleName: string | undefined;
}

@Component({
  selector: 'app-student-only',
  imports: [CommonModule, FormsModule],
  templateUrl: './student-only.component.html',
  styleUrl: './student-only.component.css',
})
export class StudentOnlyComponent implements OnInit {
  students!:Student

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }
}
