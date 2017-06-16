import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthComponent, SignUpComponent, SignInComponent, 
  SignInForgotComponent, LoginComponent } from "./auth";
import { MainComponent } from "./main";
import { InfoComponent } from "app/shared";


import { AuthGuardService } from "./auth/index";



const AppRoutes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-in-forgot', component: SignInForgotComponent },
  { path: 'login', component: LoginComponent },

  { path: 'info/:id',  component: InfoComponent },
  { path: 'welcome',  component: MainComponent , canActivate: [AuthGuardService] },
  
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