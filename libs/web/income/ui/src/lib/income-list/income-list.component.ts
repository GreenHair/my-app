import { Component, Input, OnInit } from '@angular/core';
import { EinkommenDto } from '@my-app/shared/util/dto';

@Component({
  selector: 'my-app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit {

  @Input() incomeList : EinkommenDto[]

  constructor() { }

  ngOnInit(): void {
  }

}
