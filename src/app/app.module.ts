import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//If you use commons elements (ngSwitch, ngIf, ngFor, ...) of Angular2 you must import CommonModule in your app
import { CommonModule } from '@angular/common'
//  to use FormGroup
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// The module that includes http's providers
import { HttpModule } from '@angular/http';


import { FacebookModule } from 'ngx-facebook';


import { RoutingModule } from "app/routing.module";


import { SettingService, HelperService, HttpService, 
  WebSocketService, ModalsService,
  AuthService, AuthGuardService, AuthFbService } from "app/index";


import { ErrorMsgComponent, InfoComponent, VideoPlayerComponent, 
  ModalsComponent, WelcomeComponent, VideoComponent,
  AuthFormsComponent, AppHeaderComponent,
  MainComponent, AuthComponent, AppFooterComponent  } from "app/index";


import { AppComponent } from "app/app.component";


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,

    FacebookModule.forRoot(),

    RoutingModule
  ],
  providers:    [ 
    SettingService,
    HelperService,
    HttpService,
    WebSocketService,
    ModalsService,
    AuthService,
    AuthGuardService,
    AuthFbService
  ],
  declarations: [
    AppComponent,
    MainComponent,
    AuthComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AuthFormsComponent,
    ErrorMsgComponent,
    InfoComponent,
    VideoPlayerComponent,
    ModalsComponent,
    WelcomeComponent,
    VideoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
