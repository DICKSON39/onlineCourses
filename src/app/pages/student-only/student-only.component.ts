import { Component } from '@angular/core';
import {DashboardService, Students} from '../../services/dashboard.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-student-only',
  imports: [CommonModule, FormsModule],
  templateUrl: './student-only.component.html',
  styleUrl: './student-only.component.css',
})
export class StudentOnlyComponent implements OnInit {
  students:Students[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getStudents().subscribe((data:Students[]) => {
      this.students = data;
    });
  }
}
