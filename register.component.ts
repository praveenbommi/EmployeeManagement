import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registeredUserdata={}
  errorMsg='';
  successMsg='';
  sm='Successfully registered Dood'
  registermsg:boolean
  constructor(private registerservice:AuthService
    // ,private _router:Router
    ) { }

  ngOnInit() {
  }

  submitted(){
    console.log(this.registeredUserdata)
    this.registerservice.registerUser(this.registeredUserdata)
    .subscribe(
      // res => this.successMsg=JSON.stringify(res),
      res=>{this.successMsg=this.sm
        this.registermsg=true
      // localStorage.setItem('token', res.token)
      // this._router.navigate(['/login'])
    },
      err =>{ this.registermsg=false
        this.errorMsg= "Oops!! Username/Password/Employee_no Already Exists"}
    ) 
  }
 
}
