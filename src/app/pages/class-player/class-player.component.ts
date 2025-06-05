import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from '../../services/class.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-class-player',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './class-player.component.html',
  styleUrls: ['./class-player.component.css'],
})
export class ClassPlayerComponent implements OnInit {
  classData: any;
  selectedVideo: any;

  constructor(
    private route: ActivatedRoute,
    private classService: ClassService
  ) {}

  ngOnInit() {
    const classId = this.route.snapshot.paramMap.get('id');
    if (classId) {
      this.loadClassById(classId);
    }
  }

  loadClassById(id: string) {
    this.classService.getMyPaidClasses().subscribe({
      next: (res) => {
        const classList = res.classes;
        this.classData = classList.find((cls: any) => cls.id == id);

        if (this.classData?.videos?.length > 0) {
          this.selectedVideo = this.classData.videos[0]; // auto-play first video
        }
      },
      error: (err) => {
        console.error('Error loading class', err);
      },
    });
  }

  playVideo(video: any) {
    this.selectedVideo = video;
  }
}
