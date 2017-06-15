
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";


import { SharedModule } from "app/shared/shared.module";


import { AuthComponent, SignUpComponent, SignInComponent, LoginComponent } from './index';


import { AuthService, FbService } from "./index";


@NgModule({
  imports:      [ 
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    
    SharedModule
  ],
  providers:    [ 
    AuthService,
    FbService
  ],
  declarations: [ 
    AuthComponent,
    SignUpComponent,
    SignInComponent,
    LoginComponent
 ],
  exports:      [ 
    AuthComponent,
    SignUpComponent,
    SignInComponent,
    LoginComponent 
  ]
})
export class AuthModule { }