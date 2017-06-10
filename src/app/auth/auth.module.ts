
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './index';


import { AuthService } from "./index";


@NgModule({
  imports:      [ 
    CommonModule
  ],
  providers:    [ 
    AuthService
  ],
  declarations: [ LoginComponent ],
  exports:      [ LoginComponent ]
})
export class AuthModule { }