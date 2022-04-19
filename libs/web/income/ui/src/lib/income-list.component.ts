import { Component, Input, OnInit } from '@angular/core';
import { EinkommenDto } from '@my-app/shared/util/dto';

@Component({
  selector: 'my-app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit {

  @Input() incomeList : EinkommenDto[] | null

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
