import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { ClassService } from '../../services/class.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-class-player',
  templateUrl: './class-player.component.html',
  imports:[RouterLink,CommonModule],
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
    // Get the class id from route params
    const classId = this.route.snapshot.paramMap.get('id');
    if (classId) {
      this.loadClassById(classId);
    }
  }

  loadClassById(id: string) {
    this.classService.getMyPaidClasses().subscribe({
      next: (res) => {
        this.classData = res; // adjust depending on your API response
        if (this.classData.videos?.length > 0) {
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
