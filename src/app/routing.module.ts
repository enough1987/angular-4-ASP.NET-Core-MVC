import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AuthComponent, AuthFormsComponent, MainComponent,
 InfoComponent } from "app/index";


import { AuthGuardService } from "app/index";


const AppRoutes: Routes = [
  { path: '', component: AuthComponent, data: { title: 'Fabulave' } },
  { path: 'sign-in', component: AuthFormsComponent, data: { title: 'Sign In' } },
  { path: 'sign-up', component: AuthFormsComponent, data: { title: 'Sign Up' } },
  { path: 'sign-in-forgot', component: AuthFormsComponent, data: { title: 'Forgot Password' } },

  { path: 'info/:id',  component: InfoComponent, data: { title: 'Info' } },

  { path: 'welcome',  component: MainComponent, data: { title: 'Welcome' } }, // , canActivate: [AuthGuardService]
  
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