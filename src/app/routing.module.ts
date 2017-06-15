import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthComponent, SignUpComponent, LoginComponent } from "./auth";
import { MainComponent } from "./main";
import { InfoComponent } from "app/shared";


import { AuthService } from "./auth/index";



const AppRoutes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },

  { path: 'info/:id',  component: InfoComponent },
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