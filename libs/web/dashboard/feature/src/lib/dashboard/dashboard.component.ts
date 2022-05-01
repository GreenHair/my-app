import { Component, OnDestroy, OnInit } from '@angular/core';
import { IncomeService } from '@my-app/web/income/data-access';
import { Invoice, InvoiceService } from '@my-app/web/invoice/data-access';
import { SumPipe } from '@my-app/web/shared/utils';
import { IPeriodQuery } from 'libs/web/shared/ui/src/lib/year-month-week/year-month-week.component';
import * as moment from 'moment';
import { map, Observable, Subject, Subscription, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  invoices$: Observable<Invoice[]>
  years$: Observable<number[]>
  periodQuery$ : Observable<{year: number, month?: number, week?:number}>
  periodSelectionChanged$ = new Subject()
  incomeSubscription: Subscription
  sumOut: number = 0
  sumIn: number = 0
  initialValues: IPeriodQuery = {
    period: 'month',
    query: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      week: moment().isoWeek()
    }
  }

  constructor(private invoiceService: InvoiceService,
    private incomeService: IncomeService, private sumPipe: SumPipe) { }

  ngOnInit(): void {
    this.periodQuery$ = this.periodSelectionChanged$.pipe(
      map(formValue => {
        const periodQuery = formValue as IPeriodQuery
        let query: { year: number, month?: number, week?: number } = { year: periodQuery.query.year }
        switch (periodQuery.period) {
          case 'month': query = { ...query, month: periodQuery.query.month }; break;
          case 'week': query = { ...query, week: periodQuery.query.week }; break;
        }
        return query
      })
    )
    this.invoices$ = this.periodQuery$.pipe(
      switchMap(query => this.invoiceService.getInvoices(query)),
      tap(invoices => this.sumOut = this.sumPipe.transform(invoices)),
      map(invoices => {
        console.log("invoices", invoices)
        return invoices.sort((a, b) => b.date.getTime() - a.date.getTime())
      })
    )

    this.incomeSubscription = this.periodQuery$.pipe(
      switchMap(query => this.incomeService.getIncomeList(query)) 
    )
    .subscribe(
      income => {
        console.log("income", income)
        this.sumIn = this.sumPipe.transform(income)
      })

    this.years$ = this.invoiceService.getYears()
  }

  ngOnDestroy(): void {
    this.incomeSubscription.unsubscribe()
  }
}
