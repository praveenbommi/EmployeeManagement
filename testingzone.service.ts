import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestingzoneService {

  private t_url: string = "http://localhost:3000/getUsers";

  
  constructor(private http:HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get<any>(this.t_url)
  }

updateUser(user,updateduserobj):Observable<any>{
  return this.http.put<any>("http://localhost:3000/update/"+user,updateduserobj)
}

getdata(dataobj):Observable<any>{
  return this.http.post<any>("http://localhost:3000/getdata",dataobj)
}

}