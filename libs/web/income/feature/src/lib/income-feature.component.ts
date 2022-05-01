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
  years$ : Observable<number[]>
  periodSelectionChanged$ = new Subject()
  initialValues: IPeriodQuery = {
    period: 'month',
    query: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      week: moment().isoWeek()
    }
  }

  constructor(private service: IncomeService) { }

  ngOnInit(): void {
    this.incomeList$ = this.periodSelectionChanged$.pipe(
      map(formValue => {
        const periodQuery = formValue as IPeriodQuery
        let query: { year: number, month?: number, week?: number } = { year: periodQuery.query.year }
        switch (periodQuery.period) {
          case 'month': query = { ...query, month: periodQuery.query.month }; break;
        }
        return query
      }),
      switchMap(query => this.service.getIncomeList(query)),
      map(income => income.sort((a,b) => a.datum > b.datum ? -1 : 1))
    )
  }

}
