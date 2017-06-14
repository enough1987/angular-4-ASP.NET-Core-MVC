
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from "app/shared/shared.module";


import { AuthComponent, LoginComponent } from './index';


import { AuthService } from "./index";



@NgModule({
  imports:      [ 
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    
    SharedModule
  ],
  providers:    [ 
    AuthService
  ],
  declarations: [ 
    AuthComponent,
    LoginComponent
 ],
  exports:      [ 
    AuthComponent,
    LoginComponent 
  ]
})
export class AuthModule { }