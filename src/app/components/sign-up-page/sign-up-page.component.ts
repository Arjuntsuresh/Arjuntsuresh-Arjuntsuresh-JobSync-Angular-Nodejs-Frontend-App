import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { jobSearch, signupDetails } from 'src/app/model/searchData';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
})
export class SignUpPageComponent {
  google: string =
    'data:image/png;base64,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';
  constructor(
    private builder: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UsersService,
    private router: Router
  ) {}
  signUpForm: FormGroup = this.builder.group({
    // Direct initialization
    email: ['', Validators.required],
    password: ['', Validators.required],
    mobile: ['', Validators.required],
    userName: ['', Validators.required],
  });
  submitSearch() {
    if (this.signUpForm.invalid) {
      this.showErrors();
    } else {
      const signUpData: signupDetails = {
        email: this.signUpForm.get('email')?.value,
        password: this.signUpForm.get('password')?.value,
        mobile: this.signUpForm.get('mobile')?.value,
        userName: this.signUpForm.get('userName')?.value,
      };
      this.userService.signUp(signUpData).subscribe({
        next: () => {
          this.snackBar.open('Successfully signed up', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          this.router.navigate(['/signin']); // Navigate to home page after successful signup
        },
        error: () => {
          this.snackBar.open('Failed to sign up', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        },
      });
    }
  }

  showErrors() {
    const controlOrder = ['userName', 'email', 'mobile', 'password']; // Order of controls
    const controlLabels: { [key: string]: string } = {
      email: 'Email',
      password: 'Password',
      mobile: 'Mobile number',
      userName: 'User name',
    };
    for (const name of controlOrder) {
      const control = this.signUpForm.get(name);
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
