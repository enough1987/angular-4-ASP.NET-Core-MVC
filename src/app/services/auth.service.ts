import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';


import { AuthFbService } from "app/services/auth-fb.service";
import { UserService } from "app/services/user.service";
import { AwsService } from "app/services/aws.service";


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

export class SignIn { 
  email: string; 
  password: string; 
}

export class SignUp { 
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

  constructor( private router: Router, private authFbService: AuthFbService, 
  private userService: UserService, private awsService: AwsService  ) {
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
  signIn(formData: SignIn): Observable<any> {
    console.log(" auth signIn ", formData );
    let sub = new Observable(observer => {
      this.awsService.signIn(formData).subscribe((data: boolean) => {
         this.loggedIn = true;
         observer.next( data );
      }, (err)=>{
         observer.error( err );
      });
    });
    return sub;
  }

   // it signs up user
  signUp(formData: SignUp): Observable<any> {
    console.log(" auth signUp ", formData );
    let sub = new Observable(observer => {
      this.awsService.signUp(formData).subscribe((data: boolean) => {
         this.loggedIn = true;
         this.userService.Info = formData;
         observer.next( data );
      }, (err)=>{
         observer.error( err );
      });
    });
    return sub;
  }

  // send code to confirm
  confirmCode(code): Observable<any>{
    console.log(" confirm code " );
    let sub = new Observable(observer => {
      this.awsService.confirmCode(code).subscribe((data: boolean) => {
         observer.next( data );
      }, (err)=>{
         observer.error( err );
      });      
    }); 
    return sub; 
  }

  resendConfirmationCode(): Observable<any>{
    console.log(" confirm code " );
    let sub = new Observable(observer => {
      this.awsService.resendConfirmationCode().subscribe((data: boolean) => {
         observer.next( data );
      }, (err)=>{
         observer.error( err );
      });      
    }); 
    return sub; 
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