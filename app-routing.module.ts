import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
//import { AppComponent } from './app.component';
import {HomeComponent } from './home/home.component';
import { from } from 'rxjs';
import {TestingComponent } from './testing/testing.component';
import { AuthGuard } from './auth.guard';
import { ActionComponent } from './action/action.component';

const routes: Routes = [
  {path: '', redirectTo:'/Home',pathMatch:'full'},
  {path: 'Home', component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'action', component:ActionComponent},
  {path:'testphase', component:TestingComponent,canActivate:[AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
