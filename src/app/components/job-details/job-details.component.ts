import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  job: any;
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) {}
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
  apply() {
    this.router.navigate(['/job-application'], {
      queryParams: { id: this.job._id },
    });
  }
}
