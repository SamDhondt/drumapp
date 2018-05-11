import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Rudiment } from '../rudiment/rudiment.model';
import { Subject } from 'rxjs/Subject';
import { distinctUntilChanged, debounceTime, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rudiment-list',
  templateUrl: './rudiment-list.component.html',
  styleUrls: ['./rudiment-list.component.css']
})
export class RudimentListComponent implements OnInit {
  public filterRudimentName: string;
  public filterRudiment$ = new Subject<string>();
  @Input() public rudiments: Rudiment[];
  @Output() onSelectRudiment = new EventEmitter<Rudiment>();
  

  constructor() { 
    this.filterRudiment$.pipe(
      distinctUntilChanged(),
      debounceTime(300),
      map(val => val.toLowerCase().trim())
    ).subscribe(val => this.filterRudimentName = val);
  }

  ngOnInit() {
    
  }

  public selectRudiment(rudiment: Rudiment) {
    this.onSelectRudiment.emit(rudiment);
    return false;
  }

  // addRudiment(rudiment: Rudiment){
  //   this.onAddRudiment.emit(rudiment);
  // }

  // getRudimentNames(): string[]{
  //   return this.rudiments.map(r => r.name);
  // }

}
