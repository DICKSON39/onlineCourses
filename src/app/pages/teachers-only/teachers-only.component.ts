import { Component, OnInit } from '@angular/core';
import {
  DashboardService,
  Students,
  Teacher,
} from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { User, UserService } from '../../services/user.service';

@Component({
  selector: 'app-teachers-only',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './teachers-only.component.html',
  styleUrl: './teachers-only.component.css',
})
export class TeachersOnlyComponent implements OnInit {
  teachers!: Teacher;

  constructor(
    private dashboardService: DashboardService,
    private userService: UserService,
  ) {}
  ngOnInit(): void {
    this.dashboardService.getTeachers().subscribe((data) => {
      this.teachers = data;
    });
  }
}
