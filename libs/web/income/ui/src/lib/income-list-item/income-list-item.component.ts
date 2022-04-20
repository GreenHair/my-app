import { Component, Input, OnInit } from '@angular/core';
import { EinkommenDto } from '@my-app/shared/util/dto';

@Component({
  selector: 'my-app-income-list-item',
  templateUrl: './income-list-item.component.html',
  styleUrls: ['./income-list-item.component.css']
})
export class IncomeListItemComponent implements OnInit {

  @Input() incomeList : EinkommenDto[]

  get date() : Date {
    if(this.incomeList){
      return this.incomeList[0].datum
    }
    return new Date()
  }

  get sum() : number {
    if(this.incomeList) {
      return this.incomeList.map(i => i.betrag).reduce((previous, current) => previous + current, 0)
    }
    return 0.00
  }

  constructor() { }

  ngOnInit(): void {
  }

}
