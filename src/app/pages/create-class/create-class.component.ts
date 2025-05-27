import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClassService } from '../../services/class.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class CreateClassComponent {
  @Input() courseId!: number;
  @Output() classCreated = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  classForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(private fb: FormBuilder, private classService: ClassService) {
    this.classForm = this.fb.group({
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  onSubmit() {
    if (this.classForm.invalid || this.selectedFiles.length === 0) return;

    const formData = new FormData();
    formData.append('courseId', this.courseId.toString());
    formData.append('startTime', this.classForm.value.startTime);
    formData.append('endTime', this.classForm.value.endTime);
   

    this.selectedFiles.forEach((file) => {
      formData.append('files', file); // backend expects this as `files`
    });

    this.classService.createClass(formData).subscribe({
      next: () => {
        this.classCreated.emit();
        this.close.emit();
      },
      error: (err) => {
        console.error('Class creation error', err);
      },
    });
  }

  onClose() {
    this.close.emit();
  }
}
