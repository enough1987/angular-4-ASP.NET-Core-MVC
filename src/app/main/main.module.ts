
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MainComponent } from './index';


import { SharedModule } from "app/shared/shared.module";


@NgModule({
  imports:      [ 
    CommonModule,
    
    SharedModule 
  ],
  providers:    [ ],
  declarations: [ MainComponent ],
  exports:      [ MainComponent ]
})
export class MainModule { }