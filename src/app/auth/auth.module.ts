
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";


import { SharedModule } from "app/shared/shared.module";


import { AuthComponent, AuthInfoComponent } from './index';


import { AuthService, AuthGuardService, AuthFbService } from "./index";


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
    AuthGuardService,
    AuthFbService
  ],
  declarations: [ 
    AuthComponent,
    AuthInfoComponent
 ],
  exports:      [ 
    AuthComponent,
    AuthInfoComponent
  ]
})
export class AuthModule { }