import { Component, OnInit, ViewEncapsulation } from '@angular/core';


import { AuthService } from "app/index";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {


  constructor(private authService: AuthService ) { 
    console.log(" constructor of app ");
    this.authService.retrieveCurrentUser();

  }

}
