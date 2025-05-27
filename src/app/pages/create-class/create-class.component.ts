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
  selectedFiles: File[] = [];
  fileTitles: string[] = []; // 👈 Each file’s title goes here

  constructor(private fb: FormBuilder, private classService: ClassService) {
    this.classForm = this.fb.group({
      Description: ['', Validators.required],
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      this.selectedFiles = Array.from(input.files);
      this.fileTitles = this.selectedFiles.map(() => ''); // Initialize titles
    }
  }

  updateTitle(index: number, event: Event) {
  const input = event.target as HTMLInputElement;
  this.fileTitles[index] = input.value;
}


  onSubmit() {
    if (this.classForm.invalid || this.selectedFiles.length === 0) return;

    const formData = new FormData();
    formData.append('courseId', this.courseId.toString());
    formData.append('Description', this.classForm.value.Description);

    this.selectedFiles.forEach((file, index) => {
      formData.append('files', file); // 👈 file blob
      formData.append('titles', this.fileTitles[index]); // 👈 title string
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
