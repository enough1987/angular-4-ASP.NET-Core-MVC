import { Component } from '@angular/core';


import { AuthService } from "app/auth/services/auth.service";


@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {


  constructor(private authService: AuthService) { 
    console.log(" constructor of auth " );
  }

  signUpWithFB(){
    this.authService.signUpWithFb();
  }

}
