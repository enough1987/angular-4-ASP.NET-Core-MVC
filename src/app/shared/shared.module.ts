
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SettingService, HelperService, HttpService, WebSocketService } from "./index";


import { ErrorMsgComponent, VideoPlayerComponent } from "./index";


@NgModule({
  imports:      [ 
    CommonModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers:    [ 
    SettingService,
    HelperService,
    HttpService,
    WebSocketService 
  ],
  declarations: [ 
    ErrorMsgComponent,
    VideoPlayerComponent
  ],
  exports:      [ 
    ErrorMsgComponent,
    VideoPlayerComponent
  ]
})
export class SharedModule { }