
import { NgModule } from '@angular/core';


import { LoginComponent } from './index';


import { AuthService } from "./index";


@NgModule({
  imports:      [ ],
  providers:    [ 
    AuthService
  ],
  declarations: [ LoginComponent ],
  exports:      [ LoginComponent ]
})
export class AuthModule { }