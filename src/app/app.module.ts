import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//If you use commons elements (ngSwitch, ngIf, ngFor, ...) of Angular2 you must import CommonModule in your app
import { CommonModule } from '@angular/common'
//  to use FormGroup
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// The module that includes http's providers
import { HttpModule } from '@angular/http';


import { FacebookModule } from 'ngx-facebook';


import { AuthModule } from "app/auth/auth.module";
import { SharedModule } from "app/shared/shared.module";
import { RoutingModule } from "app/routing.module";
import { MainModule } from "app/main/main.module";


import { AppComponent } from 'app/app.component';


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,

    FacebookModule.forRoot(),

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
