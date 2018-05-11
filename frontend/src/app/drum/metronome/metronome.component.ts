import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Metronome } from './metronome.model';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.css']
})
export class MetronomeComponent implements OnInit {
  @Input() public metronome: Metronome;
  private _adjustMetronome: FormGroup;
  public readonly soundTypes = "Click Snare Kick Clap".split(' ');
  @Output() public onMetronome = new EventEmitter<Date>();
  @Output() public metronomeChanged = new EventEmitter<Metronome>();
  private _metronomePlaying = false;

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit() {
    this._adjustMetronome = this._fb.group({
      tempo: this.metronome.tempo,
      type: this.metronome.type,
      // tracking: false
    });
  }

  onSubmit(){
    if (this._adjustMetronome.dirty){
      this.metronome.tempo = this._adjustMetronome.value.tempo;
      this.metronome.type = this._adjustMetronome.value.type;
      // this.metronome.tracking = this._adjustMetronome.value.tracking;
      this.metronomeChanged.emit(this.metronome);
    }    
    this.metronome.play();
    this._metronomePlaying = true;   
    this.onMetronome.emit(new Date());
    this._adjustMetronome.disable();
  }

  stopMetronome(){
    this.metronome.stop();
    this._metronomePlaying = false;
    this.onMetronome.emit(new Date());
    this._adjustMetronome.enable();
  }

  get adjustMetronome(): FormGroup {
    return this._adjustMetronome;
  }

  isPlaying(): boolean{
    return this._metronomePlaying;
  }

}
