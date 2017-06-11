
import { NgModule } from '@angular/core';


import { MainComponent } from './index';


import { SharedModule } from "app/shared/shared.module";


@NgModule({
  imports:      [ 
    SharedModule 
  ],
  providers:    [ ],
  declarations: [ MainComponent ],
  exports:      [ MainComponent ]
})
export class MainModule { }