import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { jobData } from 'src/app/model/searchData';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-employer-apply-page',
  templateUrl: './employer-apply-page.component.html',
  styleUrls: ['./employer-apply-page.component.css']
})
export class EmployerApplyPageComponent {

  constructor( private builder: FormBuilder,
   private snackBar: MatSnackBar,
   private userService: UsersService
  ){}

  submitForm=this.builder.group({
    jobTitle:['',Validators.required],
    companyName:['',Validators.required],
    location:['',Validators.required],
    applicationDeadline:['',Validators.required],
    jobDescription:['',Validators.required]
  })

  submitApplication(){
    if(this.submitForm.invalid){
      this.showErrors();
    }else{
      const jobDataEmployer: jobData = {
        jobTitle: this.submitForm.get('jobTitle')?.value || '',
        location: this.submitForm.get('location')?.value || '',
        jobDescription: this.submitForm.get('jobDescription')?.value || '',
        applicationDeadline: this.submitForm.get('applicationDeadline')?.value || '',
        companyName: this.submitForm.get('companyName')?.value || '',
      };
      this.userService.employerJobApply(jobDataEmployer).subscribe({
        next: () => {
          this.snackBar.open('Application submitted successfully', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right', // Snackbar position
          });
          this.submitForm.reset();
        },
        error: (error) => {
          this.snackBar.open('Error submitting application', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right', // Snackbar position
          });
        }
      })
      
    }
  }





  showErrors(){
    const controlOrder = ['jobTitle', 'companyName','location','applicationDeadline','jobDescription']; // Order of controls
    const controlLabels: { [key: string]: string } = {
      jobTitle: 'Job title',
      companyName:'Company name',
      location: 'Location',
      applicationDeadline: 'Application deadline',
      jobDescription: 'Job description',
    };

    for (const name of controlOrder) {
      const control = this.submitForm.get(name);

      if (control && control.invalid) {
        if (control.errors?.['required']) {
          const label = controlLabels[name] || name; // Use label or fallback to the control name
          this.snackBar.open(`${label} is required`, 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right', // Snackbar position
          });
        }
        break; // Stop after showing the first error
      }
    }
  }
}
