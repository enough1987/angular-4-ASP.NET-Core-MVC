
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";


import { SharedModule } from "app/shared/shared.module";


import { AuthComponent, SignUpComponent, LoginComponent } from './index';


import { AuthService } from "./index";


@NgModule({
  imports:      [ 
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    
    SharedModule
  ],
  providers:    [ 
    AuthService
  ],
  declarations: [ 
    AuthComponent,
    SignUpComponent,
    LoginComponent
 ],
  exports:      [ 
    AuthComponent,
    SignUpComponent,
    LoginComponent 
  ]
})
export class AuthModule { }