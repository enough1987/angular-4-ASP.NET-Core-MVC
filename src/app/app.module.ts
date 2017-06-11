import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//If you use commons elements (ngSwitch, ngIf, ngFor, ...) of Angular2 you must import CommonModule in your app
import { CommonModule } from '@angular/common'
//  to use FormGroup
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AuthModule } from "./auth/auth.module";
import { SharedModule } from "./shared/shared.module";
import { RoutingModule } from "./routing.module";
import { MainModule } from "./main/main.module";


import { AppComponent } from './app.component';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    
    SharedModule,
    AuthModule,
    MainModule,
    RoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
