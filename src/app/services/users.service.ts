import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jobData, jobSearch, loginDetails, signupDetails } from '../model/searchData';
import { baseUrl } from '../environment/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  findJob(jobData: jobSearch): Observable<any> {
    return this.http.post<any>(`${baseUrl}/jobs`, jobData);
  }
  getJobById(id: string): Observable<any> {
    return this.http.get<any>(`${baseUrl}/jobs/${id}`);
  }
  applyForJob(application:FormData): Observable<any> {
    return this.http.post<any>(`${baseUrl}/submit-application`,application)
    }
    employerJobApply(job:jobData):Observable<any>{
      return this.http.post<any>(`${baseUrl}/employer/upload-job`, job);
    }
    signUp(user:signupDetails): Observable<any>{
      return this.http.post<any>(`${baseUrl}/signup`,user)
    }
    login(user:loginDetails): Observable<any>{
      return this.http.post<any>(`${baseUrl}/login`,user)
    }
}
