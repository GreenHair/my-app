import { Component, OnInit } from '@angular/core';
import { IncomeService } from 'libs/web/income/data-access/src/lib/income.service';

@Component({
  selector: 'my-app-income-feature',
  templateUrl: './income-feature.component.html',
  styleUrls: ['./income-feature.component.css']
})
export class IncomeFeatureComponent implements OnInit {

  constructor(private service: IncomeService) { }

  ngOnInit(): void {
  }

}
