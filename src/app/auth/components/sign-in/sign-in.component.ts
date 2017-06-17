import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


import { AuthService } from "app/auth/services/auth.service";


@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

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
      email: ['', [Validators.required, Validators.pattern("[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}")]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

  }

  // it signed up user
  signIn(): void {
    console.log("signIn");
    console.time("signIn");
    if ( this.formData.valid ) {
      this.authService.signIn().subscribe((data: boolean) => {
        console.log(data);
        console.timeEnd("signIn");
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