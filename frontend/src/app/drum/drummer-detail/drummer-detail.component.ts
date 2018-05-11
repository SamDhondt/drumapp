import { Component, OnInit } from '@angular/core';
import { Drummer } from '../drummer/drummer.model';
import { ActivatedRoute } from '@angular/router';
import { DrumDataService } from '../drum-data.service';

@Component({
  selector: 'app-drummer-detail',
  templateUrl: './drummer-detail.component.html',
  styleUrls: ['./drummer-detail.component.css']
})
export class DrummerDetailComponent implements OnInit {
  private _drummer: Drummer;

  constructor(private _route: ActivatedRoute,
              private _drumDataService: DrumDataService) { }

  ngOnInit() {
    this._route.data.subscribe(item => this._drummer = item["drummer"]);
  }

  get drummer(): Drummer {
    return this._drummer;
  }

}
