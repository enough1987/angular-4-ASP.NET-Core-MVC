import { Component } from '@angular/core';


import { AuthService } from "app/auth";
import { HttpService } from "app/shared/index"


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor( private authService: AuthService, private httpService: HttpService) { 
    console.log(" constructor of main " );
  }

  ngOnInit(){
    this.httpService.get("app/test.json").subscribe(res=>{
      console.log( " res ", res );
    });
  }

  logout(){
    this.authService.logout();
  }


}
