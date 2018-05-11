import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './user/authentication.service';
import { Observable } from 'rxjs/Observable';
import { DrumDataService } from './drum/drum-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private _authenticationService: AuthenticationService) {

  }

  ngOnInit(): void {
  }

  get currentUser(): Observable<string> {
    return this._authenticationService.user$;
  }



}
