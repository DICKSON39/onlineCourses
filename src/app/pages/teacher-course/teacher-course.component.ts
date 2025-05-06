import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { RouterLink } from '@angular/router';
import { CreateClassComponent } from '../create-class/create-class.component';


@Component({
  selector: 'app-teacher-course',
  standalone: true,
  imports: [CommonModule,  CreateClassComponent],
  templateUrl: './teacher-course.component.html',
  styleUrls: ['./teacher-course.component.css']
})
export class TeacherCourseComponent implements OnInit {
  courses: any[] = [];
  backendBaseUrl: string = 'http://localhost:3000';
  selectedCourse: any = null;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getTeacherCourses().subscribe({
      next: (data) => (this.courses = data),
      error: (err) => console.error('Error Fetching teacher courses', err)
    });
  }

  openClassModal(course: any) {
    this.selectedCourse = course;
  }

  onClassCreated() {
    this.selectedCourse = null; // Close modal
    this.ngOnInit(); // Refresh course list
  }

  onClose() {
    this.selectedCourse = null; // Close modal
  }
 // Re-fetch or update the course data
  
}


