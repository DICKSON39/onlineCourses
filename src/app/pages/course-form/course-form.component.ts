import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { response } from 'express';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { TeacherService } from '../../services/teacher.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';

export interface User {
  id: number;
  name: string;
  email: string;
  role_name: string;
}

@Component({
  selector: 'app-course-form',
  imports: [
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css',
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  teachers: User[] = [];

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    private router: Router,
    private teacherService: TeacherService,
  ) {}
  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      teacherId: ['', Validators.required],
      image: [null, Validators.required],
    });

    this.teacherService.getAllTeachers().subscribe((data: User[]) => {
      console.log('Teachers fetched:', data);
      this.teachers = data;
    });
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    this.courseForm.patchValue({ image: file }); // Corrected 'image'
    this.courseForm.get('image')?.updateValueAndValidity(); // Optional, but good practice
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.snackBar.open('❌ Please fill out the form correctly!', 'Close', {
        duration: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append('title', this.courseForm.get('title')?.value);
    formData.append('description', this.courseForm.get('description')?.value);
    formData.append('price', this.courseForm.get('price')?.value);
    formData.append('teacherId', this.courseForm.get('teacherId')?.value);
    formData.append('image', this.courseForm.get('image')?.value);

    this.courseService.createCourse(formData).subscribe(
      (response) => {
        this.snackBar.open('✅ Course added successfully!', 'Close', {
          duration: 3000,
        });
        //this.router.navigate(['/courses'])
      },
      (error) => {
        this.snackBar.open('❌ Failed to add course', 'Close', {
          duration: 3000,
        });
      },
    );
  }
}
