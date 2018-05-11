import { Component, OnInit } from '@angular/core';
import { DrumDataService } from '../drum-data.service';
import { Drummer } from '../drummer/drummer.model';
import { Rudiment } from '../rudiment/rudiment.model';
import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { HttpErrorResponse } from '@angular/common/http';
import { Metronome } from '../metronome/metronome.model';
import { PracticeSession } from '../practice-session/practice-session.model';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'app-drum',
  templateUrl: './drum.component.html',
  styleUrls: ['./drum.component.css'],
})
export class DrumComponent implements OnInit {

  private _rudiments: Rudiment[];
  public errorMsg: string;
  private _drummer: Drummer;
  private _startTemp: Date;


  constructor(private _drumDataService: DrumDataService,
    private _authenticationService: AuthenticationService,
    private _route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this._drumDataService.rudiments.subscribe(rudiments => this._rudiments = rudiments,
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while trying to retrieve rudiments: ${error.error}`;
      }
    );
    
    const username = this._authenticationService.user$.getValue();

    this._drumDataService.getDrummer(username).subscribe(drummer => {
      if (drummer && drummer.name) {
        this._drummer = drummer;
      } else {
        this._drumDataService.createDrummer(username).subscribe(
          newDrummer => this._drummer = newDrummer
        );
      }
      
    },
      (error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          this.errorMsg = `Error ${error.error} ${error.status} while trying to retrieve drummer: ${error.message}`;
        } else {
          this.errorMsg = `${error.name} while trying to retrieve drummer: ${error.message}`;
        }
      }
    );
  }

  trackProgress(event: Date) {
    if (this.drummer.currentRudiment != null /*&& this.drummer.metronome.tracking*/) {
      if (this._startTemp == null) {
        this._startTemp = event;
      } else {
        if (this.drummer.practiceSessionsSelectedRudiment.length > 10) {
          const ps: PracticeSession = this.drummer.practiceSessions[this.drummer.practiceSessions.length - 1];

          if (ps.tempo < this.drummer.metronome.tempo)
            this.removePracticeSession(ps);
          else {
            this._startTemp = null;
            return;
          }
        }
        this.addPracticeSession(new PracticeSession(
          this.drummer.currentRudiment,
          this.drummer.metronome.tempo,
          this._startTemp,
          new Date()
        ));
        this._startTemp = null;
      }
    }
  }

  public updateDrummer(drummer: Drummer): void {
    this._drumDataService.updateDrummer(drummer).subscribe();
  }

  public updateMetronome(metronome: Metronome): void {
    this._drumDataService.updateMetronome(metronome).subscribe();
  }

  public addPracticeSession(practiceSession: PracticeSession): void {
    this._drumDataService.addPracticeSession(practiceSession, this.drummer.id).subscribe(
      ps => {
        this.drummer.practiceSessions.push(ps);
        this.drummer.practiceSessions = this.drummer.practiceSessions.sort(this.sortByTempoThenDuration);
      }
    );
  }

  public removePracticeSession(practiceSession: PracticeSession): void {
    this._drumDataService.removePracticeSession(practiceSession).subscribe(
      ps => (this.drummer.practiceSessions = this.drummer.practiceSessions.filter(p => p.id !== ps.id))
    );
  }

  get drummer(): Drummer {
    return this._drummer;
  }

  get rudiments(): Rudiment[] {
    return this._rudiments;
  }

  private sortByTempoThenDuration(ps1: PracticeSession, ps2: PracticeSession): number {
    if (ps1.tempo > ps2.tempo) {
      return -1;
    } else if (ps1.tempo < ps2.tempo) {
      return 1;
    } else {
      if (ps1.duration > ps2.duration) {
        return -1
      }
    }
    return 1;
  }

}
