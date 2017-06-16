
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MainComponent, WelcomeComponent, VideoComponent } from './index';


import { SharedModule } from "app/shared/shared.module";


@NgModule({
  imports:      [ 
    CommonModule,
    
    SharedModule 
  ],
  providers:    [ ],
  declarations: [ 
    MainComponent,
    WelcomeComponent,
    VideoComponent
  ],
  exports:      [ 
    MainComponent,
    WelcomeComponent,
    VideoComponent  
  ]
})
export class MainModule { }