import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private r_url: string = "http://localhost:3000/register";
  private l_url: string = "http://localhost:3000/login";
  constructor(private http:HttpClient,
    private _router:Router) { }

  registerUser(user):Observable<any>{
    return this.http.post<any>(this.r_url,user).pipe(catchError(this.errorHandler))
  }
  errorHandler(error:HttpErrorResponse){
    return throwError(error);
  }
  loginUser(user):Observable<any>{
    return this.http.post<any>(this.l_url,user).pipe(catchError(this.errorHandler))
  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  logoutuser(){
    localStorage.removeItem('token')
    this._router.navigate(['/Home'])
  }
  getToken(){
    return localStorage.getItem('token')
  }
}
