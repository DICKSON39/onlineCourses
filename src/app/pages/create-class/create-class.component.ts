import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
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
  selectedFile: File | null = null;

constructor(private fb: FormBuilder, private classService: ClassService) {
  this.classForm = this.fb.group({
    title: ['', Validators.required],
    Description: ['', Validators.required]
  });
}

onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input?.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
  }
}

onSubmit() {
  if (this.classForm.invalid || !this.selectedFile) return;

  const formData = new FormData();
  formData.append('courseId', this.courseId.toString());
  formData.append('title', this.classForm.value.title);
  formData.append('Description', this.classForm.value.Description);
  formData.append('files', this.selectedFile); // still called `files` for backend consistency

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



}