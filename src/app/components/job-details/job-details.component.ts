import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  job: any;
  constructor(private route: ActivatedRoute,
    private usersService: UsersService
  ){}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.usersService.getJobById(id).subscribe(job => {
          this.job = job;
          console.log(job);
          
        });
      }
    });
  }
  apply(){

  }
  }
