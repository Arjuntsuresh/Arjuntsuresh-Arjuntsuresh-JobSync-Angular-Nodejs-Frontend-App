import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { applicationDetails } from 'src/app/model/searchData';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css'],
})
export class JobApplicationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private builder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  job: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.usersService.getJobById(id).subscribe((job) => {
          this.job = job;
        });
      }
    });
  }
  submitForm = this.builder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    citizenship: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    address: ['', Validators.required],
    zipCode: ['', [Validators.required, Validators.minLength(5)]],
    city: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    coverLetter: ['', Validators.required],
    jobId: ['', Validators.required],
  });

  fileToUpload: File | null = null;

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileToUpload = file;
    }
  }
  submitApplication() {
    if (this.submitForm.invalid) {
      this.showErrors();
    } else {
      const formData = new FormData();

      // Append form fields to FormData with type checks
      formData.append('jobId', this.job._id ?? ''); // Use an empty string if undefined
      formData.append(
        'firstName',
        this.submitForm.get('firstName')?.value ?? ''
      ); // Default to empty string if undefined
      formData.append('lastName', this.submitForm.get('lastName')?.value ?? '');
      formData.append(
        'citizenship',
        this.submitForm.get('citizenship')?.value ?? ''
      );
      formData.append(
        'dateOfBirth',
        this.submitForm.get('dateOfBirth')?.value ?? ''
      );
      formData.append('address', this.submitForm.get('address')?.value ?? '');
      formData.append('zipCode', this.submitForm.get('zipCode')?.value ?? '');
      formData.append('city', this.submitForm.get('city')?.value ?? '');
      formData.append(
        'phoneNumber',
        this.submitForm.get('phoneNumber')?.value ?? ''
      );
      formData.append('email', this.submitForm.get('email')?.value ?? '');
      formData.append(
        'coverLetter',
        this.submitForm.get('coverLetter')?.value ?? ''
      );

      if (this.fileToUpload) {
        formData.append('resume', this.fileToUpload);
      } else {
        console.error('No file selected');
      }

      this.usersService.applyForJob(formData).subscribe({
        next: () => {
          console.log('Application submitted successfully');
          this.snackBar.open('Success', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackbar-success'],
          });
          this.router.navigate(['/success']);
        },
        error: (e) => {
          console.log(e);

          this.snackBar.open('Failed to apply for job', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        },
      });
    }
  }

  showErrors() {
    const controlOrder = [
      'fullName',
      'lastName',
      'citizenship',
      'dateOfBirth',
      'address',
      'zipCode',
      'city',
      'phoneNumber',
      'email',
      'resume',
    ]; // Order of controls
    const controlLabels: { [key: string]: string } = {
      fullName: 'Full Name',
      lastName: 'Last Name',
      citizenship: 'Citizenship',
      dateOfBirth: 'Date of Birth',
      address: 'Address',
      zipCode: 'ZIP Code',
      city: 'City',
      phoneNumber: 'Phone Number',
      email: 'Email',
      resume: 'Resume',
    };

    for (const name of controlOrder) {
      const control = this.submitForm.get(name);

      if (control && control.invalid) {
        const label = controlLabels[name] || name; // Use label or fallback to the control name

        if (control.errors?.['required']) {
          this.snackBar.open(`${label} is required`, 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        } else if (control.errors?.['maxlength']) {
          const maxLength = control.errors['maxlength'].requiredLength;
          this.snackBar.open(
            `${label} cannot be longer than ${maxLength} characters`,
            'Close',
            {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            }
          );
        } else if (control.errors?.['minlength']) {
          const minLength = control.errors['minlength'].requiredLength;
          this.snackBar.open(
            `${label} must be at least ${minLength} characters`,
            'Close',
            {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            }
          );
        } else if (control.errors?.['email']) {
          this.snackBar.open(`Please enter a valid ${label}`, 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        }

        break; // Stop after showing the first error
      }
    }
  }
}
