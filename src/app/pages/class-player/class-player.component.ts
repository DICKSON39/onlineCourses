import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-class-player',
  imports: [CommonModule],
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
