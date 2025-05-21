import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface CourseViewModel {
  id: number;
  title: string;
  description: string;
  teacher: string;
  imageFullUrl: string;

}
@Component({
  selector: 'app-course-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  courses: CourseViewModel[] = [];
  errorMessage: string = '';
  backendBaseUrl: string = 'https://elearning-f7yg.onrender.com';
  searchTerm: string = '';




  constructor(private courseService: CourseService,private router:Router) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourseWithTeachers().subscribe({
      next: (data) => {
        this.courses = data.map(course => ({
          id: course.id,
          title: course.title,
          description: course.description,
          teacher: `${course.teacherName} (${course.roleName})`,
          imageFullUrl: this.backendBaseUrl + course.imageUrl,


          // Construct the full URL here
        }));


      },
      error: (error) => {
        this.errorMessage = 'Failed to load courses.';
        console.error('Error loading courses', error);
      },
    });
  }

  navigateToCourseDetails(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }


get filteredCourses() {
  if (!this.searchTerm) return this.courses;

  const term = this.searchTerm.toLowerCase();
  return this.courses.filter(course =>
    course.title.toLowerCase().includes(term) ||
    course.description.toLowerCase().includes(term) ||
    course.teacher.toLowerCase().includes(term)
  );
}
}
