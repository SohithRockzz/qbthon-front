import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './report/report.component';
import { EventComponent } from './event/event.component';
import { EventheaderComponent } from './eventheader/eventheader.component';
import { PracticeComponent } from './practice/practice.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'practice',
    component: PracticeComponent
  },
  {
    path: 'home',
    component: DashboardComponent
  },
  {
    path: 'report',
    component: ReportComponent
  },
  {
    path: 'create-event',
    component: EventComponent
  },
  {
    path: 'edit',
    component: EventheaderComponent
  }
];

const routeConfig = {
  useHash: true,
  preloadingStrategy: NoPreloading
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
