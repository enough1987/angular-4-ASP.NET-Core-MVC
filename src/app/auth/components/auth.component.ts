import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


import { AuthService } from "app/auth/services/auth.service";
import { AuthNavType, AuthTemplateCase } from "app/auth/index";


@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  
  private sub: Subscription; // subscription of router
  private emailPattern: string = "[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}"; // it is used as pattern for email

  isShowenErrors: boolean = false; // if it has true we show errors 
  formData: FormGroup; // used for form scope and validation
  tempCase: AuthTemplateCase; // template case
  templateCase = AuthTemplateCase; // copy of enum for template 
  isShowenPass: boolean = false; // used for changing visability of password


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
    private authService: AuthService){
    console.log( " constructor of auth " ); 
  }

  ngOnInit(){
    this.sub = this.router.events
      .filter(e => e instanceof NavigationEnd)
      .subscribe((e:NavigationEnd) => {
        this.isShowenErrors = false; 
        this.setTemplateCase();
        this.initReactiveForm();
      });   
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // setter of templateCase
  private setTemplateCase(){
    let id = this.activatedRoute.snapshot.params['id'];
    console.log( id );
    if ( id === undefined ) {
      this.tempCase = AuthTemplateCase.Base;
    } else if ( id === "sign-in" ) {
      this.tempCase = AuthTemplateCase.SignIn;
    } else if ( id === "sign-up" ) {
      this.tempCase = AuthTemplateCase.SignUp;
    } else if ( id === "sign-in-forgot" ) {
      this.tempCase = AuthTemplateCase.SignInForgot;   
    } else {
      this.authService.nav(AuthNavType.redirectToAuth);
    }
    console.log( " tempCase ", id , this.tempCase) 
  }

  //set FormGroup
  private initReactiveForm() {
    switch(this.tempCase) {
      case this.templateCase.SignIn:
        this.formData = this.formBuilder.group({
          email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
          password: ['', [Validators.required, Validators.minLength(4)]]
        });        
        break;
      case this.templateCase.SignUp:
        this.formData = this.formBuilder.group({
          fullName: ['', [Validators.required, Validators.minLength(4)]],
          email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
          password: ['', [Validators.required, Validators.minLength(4)]]
        });      
        break;
      case this.templateCase.SignInForgot:
        this.formData = this.formBuilder.group({
          email: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
        });      
        break;
    }
  }

  // it hendles signe up btn
  signIn(): void {
    console.log("signIn");
    if ( this.formData.valid ) {
      this.isShowenErrors = false; 
      this.authService.signIn().subscribe((data: boolean) => {
        console.log(data);
      });
    } else {
      this.isShowenErrors = true;      
    }
  }

  // it hendles signe up btn
  signUp(): void {
    console.log("signUp");
    if ( this.formData.valid ) {
      this.isShowenErrors = false; 
      this.authService.signUp().subscribe((data: boolean) => {
        console.log(data);
      });
    } else {
      this.isShowenErrors = true;      
    }
  }

  // it hendles reset pass btn 
  resetPassword() {
    console.log(" reset password ");
    if (this.formData.valid) {
      this.isShowenErrors = false; 
    } else {
      this.isShowenErrors = true;
    }
  }

  // show / hide password
  toggleShowenPass(){
    this.isShowenPass = !this.isShowenPass;
  }

}
