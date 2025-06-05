import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-class-player',
  imports: [CommonModule,RouterLink],
  templateUrl: './class-player.component.html',
  styleUrl: './class-player.component.css'
})
export class ClassPlayerComponent {
@Input() classData: any;
selectedVideo: any ;

playVideo(video: any) {
  this.selectedVideo = video;
}

}
