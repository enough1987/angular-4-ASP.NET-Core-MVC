import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthComponent, AuthFormsComponent, MainComponent,
 InfoComponent } from "app/index";


import { AuthGuardService } from "app/index";


const AppRoutes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'sign-in', component: AuthFormsComponent },
  { path: 'sign-up', component: AuthFormsComponent },
  { path: 'sign-in-forgot', component: AuthFormsComponent },

  { path: 'info/:id',  component: InfoComponent },

  { path: 'welcome',  component: MainComponent }, // , canActivate: [AuthGuardService]
  
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