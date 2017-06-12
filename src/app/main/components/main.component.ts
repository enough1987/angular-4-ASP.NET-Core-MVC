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
    this.video1 = { path:"assets/video", width: 640, height: 340, autoplay: true  };
    this.video2 = { path:"assets/video", width: 440, height: 240  };
    this.httpService.get("assets/test.json").subscribe(res=>{
      console.log( " res ", res );
    });

  }

  logout(){
    this.authService.logout();
  }


}
