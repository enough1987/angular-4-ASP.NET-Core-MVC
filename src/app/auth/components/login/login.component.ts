import { Component } from '@angular/core';
import { Router } from "@angular/router";


import { AuthService } from "../../services/auth.service";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

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

  formDataOne: FormGroup; // instance of FormGroup for first group
  loginSteps = LoginSteps; // Store a reference to the enum
  loginStep: LoginSteps = LoginSteps.One; // page step on init
  isShowenErrors: boolean = false; // if it has true we show errors 

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    console.log(" constructor of login ");
  }

  ngOnInit() {
    this.initReactiveForm();
  }

  //set FormGroup
  private initReactiveForm() {
    this.formDataOne = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}")]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  // check if password and passwordConfirm are equals 
  passwordMatchValidator(g: FormGroup):boolean {
    console.log( g.get('password').value , ' - ' , g.get('passwordConfirm').value );
    return g.get('password').value === g.get('passwordConfirm').value
      ? true : false ;
  }

  // it changes step of login
  changeStep(step: LoginSteps, validation: boolean = false, formData?: FormGroup): void {
    console.log(formData);
    if ((validation && formData && formData.valid) ||
      !validation) {
      this.isShowenErrors = false;
      this.loginStep = step;
    } else {
      this.isShowenErrors = true;
    }
  }

  // it signed in user
  signIn(): void {
    console.log(" signed In ");
    console.time("signIn");
    this.authService.login().subscribe((data: boolean) => {
      console.log(data);
      console.timeEnd("signIn");
      this.router.navigate([""]);
    });
  }

  navToSignUp() {
    console.log(" nav 1");
  }

  navToForgotPass() {
    console.log(" nav 2");
  }

}
