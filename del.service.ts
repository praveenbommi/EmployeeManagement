import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DelService {
  // private d_url: string = "http://localhost:3000/delete/"+t;

  constructor(private http:HttpClient) { }


removeUser(user):Observable<any>{
  // private d_url: string = "http://localhost:3000/delete/"+user;

  return this.http.delete<any>("http://localhost:3000/delete/"+user)
  .pipe(catchError(this.errorHandler))
}

errorHandler(error:HttpErrorResponse){
  return throwError(error);
}
}