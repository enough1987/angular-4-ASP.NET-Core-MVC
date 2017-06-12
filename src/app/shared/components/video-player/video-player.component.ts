import { Component, Input } from '@angular/core';


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

    @Input()
    set options(options: VideoOptions) {
        console.log('got video options: ', options);
        this.videoOptions = options;
    }

    videoOptions: VideoOptions;



}