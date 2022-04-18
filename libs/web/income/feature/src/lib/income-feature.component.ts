import { Component, OnInit } from '@angular/core';
import { EinkommenDto } from '@my-app/shared/util/dto';
import { IncomeService } from '@my-app/web/income/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app-income-feature',
  templateUrl: './income-feature.component.html',
  styleUrls: ['./income-feature.component.css']
})
export class IncomeFeatureComponent implements OnInit {

  incomeList$ : Observable<EinkommenDto[]>

  constructor(private service: IncomeService) { }

  ngOnInit(): void {
    this.incomeList$ = this.service.getIncomeList()
  }

}
