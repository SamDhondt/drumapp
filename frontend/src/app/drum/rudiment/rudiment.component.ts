import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Rudiment } from './rudiment.model';

@Component({
  selector: 'app-rudiment',
  templateUrl: './rudiment.component.html',
  styleUrls: ['./rudiment.component.css']
})
export class RudimentComponent implements OnInit {
  @Input() public rudiment: Rudiment;
  // @Output() public onRecord = new EventEmitter<Rudiment>();

  constructor() { 
    
  }

  // toggleProgress(arrow: HTMLSpanElement, input: HTMLDivElement){
  //   if (input.hasAttribute("hidden")){
  //     input.removeAttribute("hidden");
  //     arrow.setAttribute("class", "fa fa-caret-down");
  //   } else {
  //     input.setAttribute("hidden", "");
  //     arrow.setAttribute("class", "fa fa-caret-right");
  //   }
  //   return false;
  // }

  // recordClicked(recordBtn: HTMLSpanElement): void{
  //   let setClass = recordBtn.getAttribute("class") === "fa fa-circle" ? "fa fa-stop" : "fa fa-circle";
  //   recordBtn.setAttribute("class", setClass);
  //   this.onRecord.emit(this.rudiment);
  // }

  ngOnInit() {
  }

}
