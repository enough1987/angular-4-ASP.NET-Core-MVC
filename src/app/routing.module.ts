import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthComponent, LoginComponent } from "./auth";
import { MainComponent } from "./main";


import { AuthService } from "./auth/index";


const AppRoutes: Routes = [
  { path: 'index',  component: MainComponent , canActivate: [AuthService] },
  { path: '', component: AuthComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'index' }
];

@NgModule({
  imports: [  
    RouterModule.forRoot(AppRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class RoutingModule { }