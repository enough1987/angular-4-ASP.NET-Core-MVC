import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AuthModule } from "./auth/auth.module";
import { SharedModule } from "./shared/shared.module";
import { RoutingModule } from "./routing.module";
import { MainModule } from "./main/main.module";


import { AppComponent } from './app.component';


@NgModule({
  imports: [
    BrowserModule,
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
