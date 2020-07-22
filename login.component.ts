import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserdata = {}
  errorMsg= '' 
  constructor(private loginuserservice:AuthService,private _router:Router) { }

  ngOnInit() {
  }
  logined(){
    this.loginuserservice.loginUser(this.loginUserdata).subscribe(
     res=> {console.log(res)
      localStorage.setItem('token', res.token)
     this._router.navigate(['/testphase'])
    },
     err =>  this.errorMsg="Oops!! Invalid Username/Password"
    )
  }
  
}
