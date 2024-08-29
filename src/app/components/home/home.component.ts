import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { jobSearch } from 'src/app/model/searchData';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchResults: any[] = [];
  submitted: boolean = false;
  searchForm: FormGroup = this.builder.group({
    // Direct initialization
    jobTitle: ['', Validators.required],
    city: ['', Validators.required],
  });

  constructor(
    private builder: FormBuilder, 
    private snackBar: MatSnackBar,
    private userService: UsersService,
    private router: Router  // Injecting Router to navigate to another component
  ) {}

  ngOnInit() {}


  submitSearch() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      this.showErrors();
    } else{
      const jobData: jobSearch = {
        jobTitle: this.searchForm.get('jobTitle')?.value,
        location: this.searchForm.get('city')?.value,
      };
      this.userService.findJob(jobData).subscribe({
        next: (response) => {
        this.searchResults=response;
         
        },
        error: () => {
          this.snackBar.open("Job not found", 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right'
          });
        }
      });
      
    }
  }

  showErrors() {
    const controlOrder = ['jobTitle', 'city']; // Order of controls
    const controlLabels: { [key: string]: string } = {
      jobTitle: 'Job title',
      city: 'City',
    };

    for (const name of controlOrder) {
      const control = this.searchForm.get(name);

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

  viewDetails(job: any) {
    this.router.navigate(['/details'], { queryParams: { id: job._id } });
  }
}
