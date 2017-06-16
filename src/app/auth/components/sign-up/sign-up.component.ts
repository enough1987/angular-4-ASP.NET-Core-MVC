import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


import { AuthService } from "app/auth/services/auth.service";


@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  isShowenErrors: boolean = false; // if it has true we show errors 
  formData: FormGroup; // used for form scope and validation
  isShowenPass: boolean = false; // used for changing visability of password

  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService ) { 
    console.log(" constructor of sign-up " );
  }

  ngOnInit() {
    this.initReactiveForm();
  }

  //set FormGroup
  private initReactiveForm() {
    this.formData = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern("[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}")]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

  }

  signUpWithFB(){
    this.authService.signUpWithFb();
  }

  // it signed up user
  signUp(): void {
    console.log("signUp");
    console.time("signUp");
    if ( this.formData.valid ) {
      this.authService.signUp().subscribe((data: boolean) => {
        console.log(data);
        console.timeEnd("signUp");
      });
    } else {
      this.isShowenErrors = true;      
    }
  }

  // show / hide password
  toggleShowenPass(){
    this.isShowenPass = !this.isShowenPass;
  }


}