import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DrumDataService } from '../../drum/drum-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: FormGroup;
  public errorMsg: string;

  constructor(private _fb: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _drumDataService: DrumDataService) {

  }

  ngOnInit() {
    this.user = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(3)],
        this.serverSideValidateUsername()],
      passwordGroup: this._fb.group({
        password: ['', [Validators.required, this.passwordValidator(5)]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.comparePasswords })
    });
  }

  get passwordControl(): FormControl {
    return <FormControl>this.user.get('passwordGroup').get('password');
  }

  private passwordValidator(length: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return control.value.length < length ? {
        'passwordTooShort':
          { requiredLength: length, actualLength: control.value.length }
      } : null;
    };
  }

  private comparePasswords(control: AbstractControl): { [key: string]: any } {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password.value === confirmPassword.value ? null : { 'passwordsDiffer': true };
  }

  private serverSideValidateUsername(): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return this._authenticationService
        .checkUserNameAvailability(control.value)
        .pipe(
          map(available => {
            if (available) {
              return null;
            }
            return { userAlreadyExists: true };
          })
        );
    };
  }

  public onSubmit() {
    this._authenticationService
      .register(this.user.value.username, this.passwordControl.value)
      .subscribe(
        val => {
          if (val) {
            this._router.navigate([`/drum/practice`]);
          }
        },
        (error: HttpErrorResponse) => {
          this.errorMsg = `Error ${
            error.status
            } while trying to register user ${this.user.value.username}: ${
            error.error
            }`;
        }
      );
  }
}
