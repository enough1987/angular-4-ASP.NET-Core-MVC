import { Component } from '@angular/core';


import { AuthService } from "app/auth";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(private authService: AuthService) { 
    console.log(" constructor of main ");
  }

  logout(){
    this.authService.logout();
  }


}
