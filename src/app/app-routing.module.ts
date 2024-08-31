import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { HomeComponent } from './components/home/home.component';
import { JobApplicationComponent } from './components/job-application/job-application.component';
import { SuccessPageComponent } from './components/success-page/success-page.component';
import { EmployerApplyPageComponent } from './components/employer-apply-page/employer-apply-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details', component: JobDetailsComponent },
  { path: 'job-application', component: JobApplicationComponent },
  { path: 'success', component: SuccessPageComponent },
  { path: 'employer-apply', component: EmployerApplyPageComponent },
  { path: 'signup', component: SignUpPageComponent },
  { path: 'signin', component: SignInPageComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
