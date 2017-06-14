import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';


@Injectable()
export class AuthService implements CanActivate {

  private static instance: AuthService; // instance of Singleton 


  private isLoggedIn: boolean = false; // this field says if user logged in
  private redirectUrl: string = ""; // if user is not Logged in , user will be redirected to this url


  constructor(private router: Router) {
    return AuthService.instance ? AuthService.instance : this;
  }

  // it useds in routing as guard
  canActivate(): boolean {
    console.log( "AuthGuard#canActivate called", this.loggedIn );
    if (this.loggedIn) {
      return true;
    } else {
      this.router.navigate([this.redirectUrl]);
      return false;
    }
  }

  // it is getter for isLoggedIn
  private get loggedIn(): boolean {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true" ? true : false;
    return this.isLoggedIn;
  }

  // it is setter for isLoggedIn
  private set loggedIn(state: boolean) {
    this.isLoggedIn = state;
    localStorage.setItem("isLoggedIn", this.isLoggedIn.toString());
  }

  // it logins in user
  login(): Observable<boolean> {
   console.log("auth signIn");
    return Observable.of(true).delay(1000).do(val => this.loggedIn = true);
  }

  // it logins out user
  logout(): void {
    this.loggedIn = false;
    this.router.navigate([this.redirectUrl]);
  }

   // it signs up user
  signUp(): Observable<boolean> {
    console.log("auth signUp");
    return Observable.of(true).delay(1000).do(val => { console.log(" DO SOMETHING"); } );
  }

}