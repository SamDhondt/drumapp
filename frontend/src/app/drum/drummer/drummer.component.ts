import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { Rudiment } from '../rudiment/rudiment.model';
import { Drummer } from './drummer.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PracticeSession } from '../practice-session/practice-session.model';
import { DrumDataService } from '../drum-data.service';
import { Metronome } from '../metronome/metronome.model';


@Component({
  selector: 'app-drummer',
  templateUrl: './drummer.component.html',
  styleUrls: ['./drummer.component.css']
})
export class DrummerComponent implements OnInit {
  @Input() public drummer: Drummer;
  @Output() public metronomeChanged = new EventEmitter<Metronome>();
  @Output() public onRemovePS = new EventEmitter<PracticeSession>();

  constructor(private _drumDataService: DrumDataService) {
    
  }

  ngOnInit() {
  }

  public removePracticeSession(practiceSession: PracticeSession){
    this.onRemovePS.emit(practiceSession);
    return false;
  }

  public resetProgress(rudiment: Rudiment) {
    this.drummer.practiceSessions.forEach((ps, i, pSessions) => {
      if (ps.rudiment.name === rudiment.name){
        this.removePracticeSession(ps);
      }
    });
    return false;
  }

}
