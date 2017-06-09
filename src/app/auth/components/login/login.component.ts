import { Component } from '@angular/core';
import { Router } from "@angular/router";


import { AuthService } from "../../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService) { 
    console.log(" constructor of login ");
  }

  ngOnInit() {
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

}
