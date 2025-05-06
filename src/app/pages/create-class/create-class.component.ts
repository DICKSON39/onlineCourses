import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClassService } from '../../services/class.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css'],
  imports: [FormsModule,ReactiveFormsModule,CommonModule], // Add necessary imports here
})
export class CreateClassComponent {
  @Input() courseId!: number;
  @Output() classCreated = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  classForm: FormGroup;

  constructor(private fb: FormBuilder, private classService: ClassService) {
    this.classForm = this.fb.group({
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      meetingLink: ['', Validators.required],
      isLive: [false],
      videoPath: ['']
    });
  }

  onSubmit() {
    if (this.classForm.invalid) return;

    const payload = {
      courseId: this.courseId,
      ...this.classForm.value
    };

    this.classService.createClass(payload).subscribe({
      next: () => {
        this.classCreated.emit();
        this.close.emit();
      },
      error: err => {
        console.error('Class creation error', err);
      }
    });
  }

  onClose() {
    this.close.emit();
  }
}
