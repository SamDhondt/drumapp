import { Injectable } from '@angular/core';
import { Rudiment } from './rudiment/rudiment.model';
import { Drummer } from './drummer/drummer.model';
import { Metronome } from './metronome/metronome.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PracticeSession } from './practice-session/practice-session.model';
import { AuthenticationService } from '../user/authentication.service';

@Injectable()
export class DrumDataService {
  private readonly _appUrl = "/API";
  private readonly _drummerId = "";

  constructor(private _http: HttpClient,
              private _authenticationService: AuthenticationService) {
  }

  get rudiments(): Observable<Rudiment[]> {
    return this._http
      .get(`${this._appUrl}/rudiments/`)
      .pipe(
        map((list: any[]): Rudiment[] =>
          list.map(Rudiment.fromJSON)
        )
      );
  }

  // get drummers(): Observable<Drummer[]> {
  //   return this._http
  //     .get(`${this._appUrl}/drummers/`)
  //     .pipe(
  //       map((list: any[]): Drummer[] => 
  //         list.map(Drummer.fromJSON)
  //       )
  //     );
  // }

  public updateDrummer(drummer: Drummer): Observable<Drummer> {
    return this._http
      .put<Drummer>(`${this._appUrl}/drummer/${drummer.id}`, drummer);
  }

  public updateMetronome(metronome: Metronome): Observable<Metronome> {
    return this._http.put<Metronome>(`${this._appUrl}/metronome/${metronome.id}`, metronome);
  }

  public addPracticeSession(practiceSession: PracticeSession, drummerId: string): Observable<PracticeSession>{
    return this._http
                .post(`${this._appUrl}/drummer/${drummerId}/practiceSessions`, practiceSession)
                .pipe(
                  map(PracticeSession.fromJSON)
                );
  }

  public removePracticeSession(practiceSession: PracticeSession): Observable<PracticeSession>{
    return this._http
                .delete(`${this._appUrl}/practicesession/${practiceSession.id}`)
                .pipe(
                  map(PracticeSession.fromJSON)
                );
  }

  public createDrummer(username: string): Observable<Drummer> {
    console.log(this._authenticationService.token);
    const drummer = new Drummer(username, new Array<PracticeSession>(), new Metronome());
    return this._http
                .post(`${this._appUrl}/drummers`, drummer)
                .pipe(
                  map(Drummer.fromJSON)
                );
  }

  public getDrummer(name: string): Observable<Drummer>{
    return this._http
      .get(`${this._appUrl}/drummer/${name}`)
      .pipe(
        map(Drummer.fromJSON)
      );
  }
}
