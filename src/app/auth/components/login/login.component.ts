import { Component } from '@angular/core';
import { Router } from "@angular/router";


import { AuthService } from "../../services/auth.service";

// this enum is used for changing step of login
enum LoginSteps {
  One,
  two
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginSteps = LoginSteps; // Store a reference to the enum
  loginStep:LoginSteps = LoginSteps.One; // page step on init

  constructor(private router: Router, private authService: AuthService) { 
    console.log(" constructor of login ");
  }

  ngOnInit() {
  }

  // it changes step of login
  changeStep(step: LoginSteps): void {
    this.loginStep = step;
  }

  // it signed in user
  signIn (): void {
    console.log( " signed In " );
    console.time("signIn");
    this.authService.login().subscribe( (data:boolean) => {
      console.log(data);
      console.timeEnd("signIn");
      this.router.navigate([""]);     
    });
  }

  navToSignUp() {
    console.log( " nav 1");
  }

  navToForgotPass() {
    console.log( " nav 2");    
  }

}
