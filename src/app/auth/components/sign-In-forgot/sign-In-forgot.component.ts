import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


import { AuthService } from "app/auth/services/auth.service";


@Component({
    selector: 'sign-in-forgot',
    templateUrl: './sign-in-forgot.component.html',
    styleUrls: ['./sign-in-forgot.component.scss']
})
export class SignInForgotComponent {

    isShowenErrors: boolean = false; // if it has true we show errors 
    formData: FormGroup; // used for form scope and validation

    constructor(private formBuilder: FormBuilder,
        private authService: AuthService) {
        console.log(" constructor of sign-in-forgot ");
    }

    ngOnInit() {
        this.initReactiveForm();
    }

    //set FormGroup
    private initReactiveForm() {
        this.formData = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern("[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}")]]
        });
    }

    resetPassword() {
        console.log(" reset password ");
        console.time("reset");
        if (this.formData.valid) {
            console.timeEnd("reset");
        } else {
            this.isShowenErrors = true;
        }
    }


}