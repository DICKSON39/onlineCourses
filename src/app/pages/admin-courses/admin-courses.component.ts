import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface CourseViewModel {
  id: number;
  title: string;
  description: string;
  teacher: string;
  imageFullUrl: string;
}

@Component({
  selector: 'app-admin-courses',
  imports: [CommonModule],
  templateUrl: './admin-courses.component.html',
  styleUrl: './admin-courses.component.css',
})
export class AdminCoursesComponent {
  courses: CourseViewModel[] = [];
  errorMessage: string = '';
  backendBaseUrl: string = 'http://localhost:3000';

  constructor(
    private courseService: CourseService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourseWithTeachers().subscribe({
      next: (data) => {
        this.courses = data.map((course) => ({
          id: course.id,
          title: course.title,
          description: course.description,
          teacher: `${course.teacherName} `,

          imageFullUrl: this.backendBaseUrl + course.image,
        }));
      },
      error: (error) => {
        this.errorMessage = 'Failed to load courses.';
        console.error('Error loading courses', error);
      },
    });
  }

  deleteCourse(courseId: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(courseId).subscribe({
        next: () => {
          this.courses = this.courses.filter(
            (course) => course.id !== courseId,
          );
        },
        error: (err) => {
          console.error('Failed to delete course:', err);
          alert('Failed to delete course');
        },
      });
    }
  }

  editCourse(course: CourseViewModel): void {
    this.router.navigate(['/admin/edit-course', course.id], {
      state: { course },
    });
  }
}
