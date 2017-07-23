import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';


import { DashboardComponent } from "app/dashboard/dashboard.component";
import { MobileConsoleComponent } from "app/dashboard/mobile-console.component";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    //data: {
    //  title: 'Home'
    //},
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title : 'Dashboard' }
      },
      {
        path: 'dashboard/mobile-console',
        component: MobileConsoleComponent,
        data: { title : 'Mobile Console' }
      },
      {
        path: 'dashboard/mobile-console/:id',
        component: MobileConsoleComponent,
        data: { title : 'Mobile Console' }
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
