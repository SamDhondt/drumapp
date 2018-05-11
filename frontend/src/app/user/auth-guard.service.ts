import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _authenticationService: AuthenticationService,
              private _router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const user = this._authenticationService.user$.getValue();
    if (user) {
      return true;
    }
    this._authenticationService.redirectUrl = state.url;
    this._router.navigate(['/login']);
    return false;
  }
}
