import { Component, OnInit, Input } from '@angular/core';
import { PracticeSession } from './practice-session.model';

@Component({
  selector: 'app-practice-session',
  templateUrl: './practice-session.component.html',
  styleUrls: ['./practice-session.component.css']
})
export class PracticeSessionComponent implements OnInit {
  @Input() public practiceSession: PracticeSession;

  constructor() { }

  ngOnInit() {
  }

}
