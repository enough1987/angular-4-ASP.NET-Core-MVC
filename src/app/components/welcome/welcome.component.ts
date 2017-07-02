import { Component } from '@angular/core';


import { AuthService } from "app/index";



@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {


  constructor( private authService: AuthService ) { 
    console.log(" constructor of welcome " );
  }

  // https://stackoverflow.com/questions/40214772/file-upload-in-angular-2
  changeFoto(event) {
    this.authService.changeFoto(event).subscribe(
      data => console.log('success'),
      error => console.log(error)
    );
  }
  


}