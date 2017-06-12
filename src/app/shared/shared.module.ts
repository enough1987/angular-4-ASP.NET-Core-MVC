
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SettingService, HttpService } from "./index";


import { ErrorMsgComponent } from "./index";


@NgModule({
  imports:      [ 
    CommonModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers:    [ 
    SettingService,
    HttpService 
  ],
  declarations: [ 
    ErrorMsgComponent
  ],
  exports:      [ 
    ErrorMsgComponent
  ]
})
export class SharedModule { }