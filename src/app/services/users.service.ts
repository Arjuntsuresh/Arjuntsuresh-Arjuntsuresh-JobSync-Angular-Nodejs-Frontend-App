import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  jobData,
  jobSearch,
  loginDetails,
  signupDetails,
} from '../model/searchData';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  findJob(jobData: jobSearch): Observable<any> {
    return this.http.post<any>(`${environment.BaseURL}/jobs`, jobData);
  }
  getJobById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.BaseURL}/jobs/${id}`);
  }
  applyForJob(application: FormData): Observable<any> {
    return this.http.post<any>(`${environment.BaseURL}/submit-application`, application);
  }
  employerJobApply(job: jobData): Observable<any> {
    return this.http.post<any>(`${environment.BaseURL}/employer/upload-job`, job);
  }
  signUp(user: signupDetails): Observable<any> {
    return this.http.post<any>(`${environment.BaseURL}/signup`, user);
  }
  login(user: loginDetails): Observable<any> {
    return this.http.post<any>(`${environment.BaseURL}/login`, user);
  }
}
