import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EinkommenDto } from '@my-app/shared/util/dto';
import { IncomeService } from '@my-app/web/income/data-access';
import { Invoice, InvoiceService } from '@my-app/web/invoice/data-access';
import { SumPipe } from '@my-app/web/shared/utils';
import { Einkommen } from 'libs/api/data-access/entities/src/lib/Einkommen';
import { IPeriodQuery, YearMonthWeekComponent } from 'libs/web/shared/ui/src/lib/year-month-week/year-month-week.component';
import * as moment from 'moment';
import { map, Observable, Subscription, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('periodSelection') periodSelection: YearMonthWeekComponent
  invoices$: Observable<Invoice[]>
  years$: Observable<number[]>
  incomeSubscription: Subscription
  sumOut: number = 0
  sumIn: number = 0
  initialValues : IPeriodQuery = {
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
    

    this.incomeSubscription = this.incomeService.getIncomeList().subscribe(
      income => {
        console.log("income", income)
        this.sumIn = this.sumPipe.transform(income)
      })

    this.years$ = this.invoiceService.getYears()
  }

  ngAfterViewInit(): void {
    /* this.invoices$ = this.periodSelection.valueChanged$.pipe(
      switchMap(form => {
        console.log(form)
        return this.invoiceService.getInvoices()
      }),
      tap(invoices => this.sumOut = this.sumPipe.transform(invoices)),
    ) */
  }

  onPeriodChanged(formValue: IPeriodQuery) {
    console.log(formValue)
    const periodQuery = formValue as IPeriodQuery
    switch (periodQuery.period) {
      case 'all': 
        delete periodQuery.query.month;
        delete periodQuery.query.week;
        break;
      case 'month': delete periodQuery.query.week; break;
      case 'week': delete periodQuery.query.month; break;
    }
    this.invoices$ = this.invoiceService.getInvoices(periodQuery.query).pipe(
      tap(invoices => this.sumOut = this.sumPipe.transform(invoices)),
      map(invoices => {
        console.log("invoices", invoices)
        return invoices.sort((a, b) => b.date.getTime() - a.date.getTime())
      })
    )
  }


  ngOnDestroy(): void {
      this.incomeSubscription.unsubscribe()
  }
}
