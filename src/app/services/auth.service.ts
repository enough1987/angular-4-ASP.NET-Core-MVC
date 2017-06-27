import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';


import { AuthFbService } from "app/services/auth-fb.service";
import { UserService } from "app/services/user.service";


export enum AuthNavType {
  redirectToAuth,
  redirectFromAuth
}

export enum AuthTemplateCase {
  Base,
  SignUp,
  SignIn,
  SignInForgot
}

class SignIn { 
  email: string; 
  password: string; 
}

class SignUp { 
  fullName: string; 
  email: string; 
  password: string; 
  subscribeOnUpdates: boolean;
}


@Injectable()
export class AuthService {


  private isLoggedIn: boolean = false; // this field says if user logged in
  private redirectToAuth: string = ""; // it uses for redirection to auth
  private redirectFromAuth: string = ""; // it uses for redirection from auth

  constructor( private router: Router, private authFbService: AuthFbService, private userService: UserService ) {
  }

  // it is getter for isLoggedIn
  get loggedIn(): boolean {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    return this.isLoggedIn;
  }

  // it is setter for isLoggedIn
  set loggedIn(state: boolean) {
    this.isLoggedIn = state;
    localStorage.setItem("isLoggedIn", this.isLoggedIn.toString());
  }

  // navigation to/from auth page group
  nav( authNavType: AuthNavType ): void {
    console.log( " nav ", authNavType );
    if ( authNavType === AuthNavType.redirectToAuth ) this.router.navigate([this.redirectToAuth]);
    if ( authNavType === AuthNavType.redirectFromAuth ) this.router.navigate([this.redirectFromAuth]);  
  }

  // it logins out user
  signOut(): void {
    this.loggedIn = false;
    this.nav(AuthNavType.redirectToAuth);
  }

  // it logins in user
  signIn(formData: SignIn): Observable<boolean> {
    console.log(" auth signIn ", formData );
    return Observable.of(true).delay(1000).do(val => {
      this.loggedIn = true;
      //this.nav(AuthNavType.redirectFromAuth);
    });
  }

   // it signs up user
  signUp(formData: SignUp): Observable<boolean> {
    console.log(" auth signUp ", formData );
    return Observable.of(true).delay(1000).do(val => {
      this.loggedIn = true;
      this.userService.info = formData;
      //this.nav(AuthNavType.redirectFromAuth);
    });
  }

  // send code to confirm
  confirmCode(): Observable<boolean>{
    console.log(" confirm code " );
    return Observable.of(true).delay(1000).do(val => {
      
    });  
  }

  resendCode(): Observable<boolean>{
    console.log(" resend code " );
    return Observable.of(true).delay(1000).do(val => {
      
    });  
  }

  // type of sign in ( with Facebook )
  signInWithFb():void {
    this.authFbService.signIn();
  }

  // type of sign up ( with Facebook )
  signUpWithFb():void {
    this.authFbService.signUp();
  }

}