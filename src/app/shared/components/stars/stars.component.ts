import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  //templateUrl: './stars.component.html',
  template : `<div [innerHTML]="iconStr"></div>`,
  styleUrls: ['./stars.component.css']
})
export class StarsComponent {
  @Input() score!:number;
  iconStr:string = '';
  scoreArray:Array<number> = [];

  ngOnInit() {
    this.score = Math.round(this.score / 2);

    for (let i=0; i< this.score; i++) {
      this.iconStr += '<i class="fas fa-star">';
    }
    for (let i=this.score; i< 5; i++) {
      this.iconStr += '<i class="far fa-star">';
    }
  }
}
