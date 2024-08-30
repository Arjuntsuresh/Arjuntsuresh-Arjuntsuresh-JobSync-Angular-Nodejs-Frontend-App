import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FootersComponent } from './components/footers/footers.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JobApplicationComponent } from './components/job-application/job-application.component';
import { SuccessPageComponent } from './components/success-page/success-page.component';
import { EmployerApplyPageComponent } from './components/employer-apply-page/employer-apply-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';

@NgModule({
  declarations: [
    AppComponent,
    JobDetailsComponent,
    HomeComponent,
    FootersComponent,
    JobApplicationComponent,
    SuccessPageComponent,
    EmployerApplyPageComponent,
    SignUpPageComponent,
    SignInPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
