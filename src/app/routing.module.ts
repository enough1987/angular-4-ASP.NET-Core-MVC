import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from "./auth";
import { MainComponent } from "./main";


import { AuthService } from "./auth/index";


const AppRoutes: Routes = [
  { path: '',  component: MainComponent , canActivate: [AuthService] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
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