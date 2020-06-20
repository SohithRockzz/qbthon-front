import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportComponent } from './report/report.component';
import { CreateQuestioniareComponent } from './create-questioniare/create-questioniare.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { EventheaderComponent } from './eventheader/eventheader.component';
import { MailComponent } from './mail/mail.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { StatusComponent } from './status/status.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import { PracticeComponent } from './practice/practice.component';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    ReportComponent,
    CreateQuestioniareComponent,
    EventheaderComponent,
    MailComponent,
    LeaderboardComponent,
    StatusComponent,
    PracticeComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot(),
    HttpClientModule,
    TabsModule.forRoot(),
    CollapseModule.forRoot(),
    
  ],
  exports: [
    TabsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
