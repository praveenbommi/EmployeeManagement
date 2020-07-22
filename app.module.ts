import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TestingComponent } from './testing/testing.component';
import { AuthService } from './auth.service';
import { TestingzoneService } from './testingzone.service';
import { DelService } from './del.service'
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
// import { from } from 'rxjs';
import { FileUploadModule } from 'ng2-file-upload';
import { FilesService } from './files.service';
import { ActionComponent } from './action/action.component';
// import {MatIconModule} from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TestingComponent,
    ActionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // MatIconModule,
    FileUploadModule
  ],
  providers: [AuthService,TestingzoneService,AuthGuard, DelService,FilesService,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
