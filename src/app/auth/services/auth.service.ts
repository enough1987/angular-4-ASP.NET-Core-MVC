import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';


import { AuthFbService } from "app/auth/services/auth-fb.service";


@Injectable()
export class AuthService {


  private isLoggedIn: boolean = false; // this field says if user logged in
  private redirectUrl: string = ""; // if user is not Logged in , user will be redirected to this url


  constructor( private router: Router, private authFbService: AuthFbService ) {
  }

  // it is getter for isLoggedIn
  get loggedIn(): boolean {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true" ? true : false;
    return this.isLoggedIn;
  }

  // it is setter for isLoggedIn
  set loggedIn(state: boolean) {
    this.isLoggedIn = state;
    localStorage.setItem("isLoggedIn", this.isLoggedIn.toString());
  }

  // it logins out user
  signOut(): void {
    this.loggedIn = false;
    this.router.navigate([this.redirectUrl]);
  }

  // it logins in user
  signIn(): Observable<boolean> {
    console.log("auth signIn");
    return Observable.of(true).delay(1000).do(val => this.loggedIn = true);
  }

   // it signs up user
  signUp(): Observable<boolean> {
    console.log("auth signUp");
    return Observable.of(true).delay(1000).do(val => { console.log(" DO SOMETHING"); } );
  }

  signInWithFb():void {
    this.authFbService.signIn();
  }

  signUpWithFb():void {
    this.authFbService.signUp();
  }

}