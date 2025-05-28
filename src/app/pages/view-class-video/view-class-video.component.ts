import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from '../../services/class.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-class-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-class-video.component.html',
  styleUrls: ['./view-class-video.component.css'],
})
export class ViewClassVideoComponent implements OnInit {
  classId!: number;
  videos: any[] = [];
  classTitle: string = '';

  constructor(
    private route: ActivatedRoute,
    private classService: ClassService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.classId = +id;
        this.loadClassVideos();
      }
    });
  }

  loadClassVideos(): void {
    this.classService.getTeacherClasses().subscribe({
      next: (classes) => {
        const foundClass = classes.find((cls) => cls.id === this.classId);
        if (foundClass) {
          this.videos = foundClass.videos;
          this.classTitle = foundClass.title;
        }
      },
      error: (err) => console.error('Error loading videos:', err),
    });
  }
}
