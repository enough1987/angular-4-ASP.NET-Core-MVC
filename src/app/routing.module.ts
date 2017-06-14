import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthComponent, SignUpComponent, LoginComponent } from "./auth";
import { MainComponent } from "./main";


import { AuthService } from "./auth/index";


const AppRoutes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },

  { path: 'index',  component: MainComponent , canActivate: [AuthService] },
  
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