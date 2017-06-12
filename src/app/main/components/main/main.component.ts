import { Component } from '@angular/core';


import { AuthService } from "app/auth";
import { HttpService } from "app/shared/index"


import { VideoOptions } from "app/shared/index"


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  video1: VideoOptions;
  video2: VideoOptions;

  constructor( private authService: AuthService, private httpService: HttpService) { 
    console.log(" constructor of main " );
  }

  ngOnInit(){
    this.video1 = new VideoOptions("assets/video", 640, 340);
    this.video2 = new VideoOptions("assets/video", 440, 200);
    this.httpService.get("assets/test.json").subscribe(res=>{
      console.log( " res ", res );
    });

  }

  logout(){
    this.authService.logout();
  }


}
