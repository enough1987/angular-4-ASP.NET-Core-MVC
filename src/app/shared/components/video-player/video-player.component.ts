import { Component, Input, ViewChild } from '@angular/core';


export class VideoOptions {

    path: string;
    width: number;
    height: number;
    autoplay?: boolean

}

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent {

    @ViewChild("video") video;

    @Input()
    set options(options: VideoOptions) {
        console.log('got video options: ', options);
        this.videoOptions = options;
    }

    videoOptions: VideoOptions;

    playPause() {
        console.log(this.video);
        if ( this.video.nativeElement.paused || this.video.nativeElement.ended ) {
            this.video.nativeElement.play();
        } else {
            this.video.nativeElement.pause();
        }
    }




}