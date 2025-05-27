import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../services/class.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthServicesService } from '../../services/auth-services.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-my-classes',
  templateUrl: './my-classes.component.html',
  styleUrls: ['./my-classes.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class MyClassesComponent implements OnInit {
  classes: any[] = [];
  selectedClass: any = null;
  showEditModal: boolean = false;

  constructor(
    private classService: ClassService,
    private authService: AuthServicesService,
    private router: Router,
    private teacherService: TeacherService,
  ) {}

  ngOnInit(): void {
    this.classService.getTeacherClasses().subscribe({
      next: (data) => {
        this.classes = data;
      },
      error: (err) => {
        console.error('Failed to load classes:', err);
      },
    });
  }

  openEditModal(classItem: any): void {
    this.selectedClass = { ...classItem };
    this.showEditModal = true;
  }

  deleteClass(id: number): void {
    if (confirm('Are you sure you want to delete this class?')) {
      this.classService.deleteClass(id).subscribe({
        next: () => {
          this.classes = this.classes.filter((cls) => cls.id !== id);
        },
        error: (err) => console.error('Delete failed', err),
      });
    }
  }

  updateClass(): void {
    this.classService.updateClass(this.selectedClass.id, this.selectedClass).subscribe({
      next: () => {
        this.classes = this.classes.map((cls) =>
          cls.id === this.selectedClass.id ? this.selectedClass : cls,
        );
        this.showEditModal = false;
      },
      error: (err) => console.error('Update failed', err),
    });
  }
}
