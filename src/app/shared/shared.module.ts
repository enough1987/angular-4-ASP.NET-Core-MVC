
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { SettingService, HelperService, HttpService, WebSocketService, UserService } from "./index";


import { ErrorMsgComponent, InfoComponent, VideoPlayerComponent } from "./index";


@NgModule({
  imports:      [ 
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule
  ],
  providers:    [ 
    SettingService,
    UserService,
    HelperService,
    HttpService,
    WebSocketService 
  ],
  declarations: [ 
    ErrorMsgComponent,
    InfoComponent,
    VideoPlayerComponent
  ],
  exports:      [ 
    ErrorMsgComponent,
    InfoComponent,
    VideoPlayerComponent
  ]
})
export class SharedModule { }