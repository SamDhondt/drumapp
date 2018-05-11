import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LogoutComponent } from './logout/logout.component';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { DrumDataService } from '../drum/drum-data.service';
import { basehttpInterceptorProviders } from '../http-interceptors';

const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    LogoutComponent
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    DrumDataService,
basehttpInterceptorProviders,
  ]
})
export class UserModule { }
