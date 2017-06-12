import { Component, Input } from '@angular/core';


export class VideoOptions {

  path: string;
  width: number;
  height: number;

  constructor(path:string, width: number, height:number) {
    this.path = path;
    this.width = width;
    this.height = height;    
  }
}

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent {

    @Input() options: VideoOptions;


}