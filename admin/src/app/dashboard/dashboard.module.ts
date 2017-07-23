import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';


import { DashboardRoutingModule } from './dashboard-routing.module';


import { DashboardComponent } from './dashboard.component';
import { MobileConsoleComponent } from './mobile-console.component';


@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule
  ],
  declarations: [ 
    MobileConsoleComponent,
    DashboardComponent 
  ]
})
export class DashboardModule { }
