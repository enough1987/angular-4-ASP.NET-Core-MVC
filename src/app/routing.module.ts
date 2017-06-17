import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthComponent } from "./auth";
import { MainComponent } from "./main";
import { InfoComponent } from "app/shared";


import { AuthGuardService } from "./auth/index";



const AppRoutes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'auth/:id', component: AuthComponent },

  { path: 'info/:id',  component: InfoComponent },
  { path: 'welcome',  component: MainComponent , canActivate: [AuthGuardService] },
  
  { path: '**', redirectTo: 'auth' }
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