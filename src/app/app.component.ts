import { Component, OnInit, ViewEncapsulation } from '@angular/core';


import { AuthService, TitleService } from "app/index";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {


  constructor( private authService: AuthService , private titleService: TitleService) { 
    console.log(" constructor of app ");
    this.authService.retrieveCurrentUser();
    this.titleService.init();
  }


}
