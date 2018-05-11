import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: FormGroup;
  public errorMsg: string;

  constructor(private _authenticationService: AuthenticationService,
    private _router: Router,
    private _fb: FormBuilder) { }

  ngOnInit() {
    this.user = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this._authenticationService
      .login(this.user.value.username, this.user.value.password)
      .subscribe(
        val => {
          if (val) {
            // if (this._authenticationService.redirectUrl) {
            //   this._router.navigateByUrl(this._authenticationService.redirectUrl);
            //   this._authenticationService.redirectUrl = undefined;
            // } else {
              this._router.navigate([`/drum/practice`]);
            // }
          } else {
            this.errorMsg = `Could not login`;
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.errorMsg = `Error while trying to login user ${
              this.user.value.username
              }: ${err.error.message}`;
          } else {
            this.errorMsg = `Error ${err.status} while trying to login user ${
              this.user.value.username
              }: ${err.error}`;
          }
        }
      );
  }

}
