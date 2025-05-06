import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent implements OnInit {
  courseForm!: FormGroup;
  courseId!: number;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router,
    
  ) {}

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get('id')!;
    this.loadCourse();
    this.courseForm = this.fb.group({
      title: [''],
      description: [''],
      price: [''],
    });
  }

  loadCourse(): void {
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (course) => {
        this.courseForm.patchValue({
          title: course.title,
          description: course.description,
          price: course.price,
        });
      },
      error: () => alert('Failed to load course'),
    });
  }

  onFileChange(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('title', this.courseForm.value.title);
    formData.append('description', this.courseForm.value.description);
    formData.append('price', this.courseForm.value.price);
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.courseService.updateCourse(this.courseId, formData).subscribe({
      next: () => {
        alert('✅ Course updated successfully');
        this.router.navigate(['/admin']);
      },
      error: () => alert('❌ Failed to update course'),
    });
  }
}
