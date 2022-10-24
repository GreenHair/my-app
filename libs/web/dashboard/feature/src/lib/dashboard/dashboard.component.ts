import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { CategoryDto, EinkommenDto, ShopDto } from '@my-app/shared/util/dto';
import { IncomeService } from '@my-app/web/income/data-access';
import { Invoice, InvoiceService } from '@my-app/web/invoice/data-access';
import { CategoryService } from '@my-app/web/shared/category/data-access';
import { ShopService } from '@my-app/web/shared/shop/data-access';
import { SumPipe } from '@my-app/web/shared/utils';
import { IPeriodQuery } from 'libs/web/shared/ui/src/lib/year-month-week/year-month-week.component';
import * as moment from 'moment';
import { combineLatest, map, Observable, startWith, Subject, Subscription, switchMap, tap } from 'rxjs';

interface IQuickInfo {
  shops: ShopDto[]
  categories: CategoryDto[],
  invoices: Invoice[],
  income: EinkommenDto[]
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  
  invoices$: Observable<Invoice[]>
  income$: Observable<EinkommenDto[]>
  shopsAndCategories$: Observable<IQuickInfo>
  years$: Observable<number[]>
  periodQuery$ : Observable<{year: number, month?: number, week?:number}>
  periodSelectionChanged$ = new Subject()
  
  initialValues: IPeriodQuery = {
    period: 'month',
    query: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      week: moment().isoWeek()
    }
  }

  periodSelector = new UntypedFormControl(this.initialValues)
  search = new UntypedFormControl()

  constructor(
    private invoiceService: InvoiceService,
    private incomeService: IncomeService, 
    private sumPipe: SumPipe,
    private shopService: ShopService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.periodQuery$ = this.periodSelector.valueChanges.pipe(
      startWith(this.initialValues),
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
    const invoiceSource$ = this.periodQuery$.pipe(
      switchMap(query => this.invoiceService.getInvoices(query)),
      map(invoices => {
        //console.log("invoices", invoices)
        return invoices.sort((a, b) => b.date.getTime() - a.date.getTime())
      })
    )

    const invoiceFilter$ = this.search.valueChanges.pipe(startWith(''));

    this.invoices$ = combineLatest([invoiceSource$, invoiceFilter$]).pipe(
      map(value => {
        return value[0].filter(i => i.laden.name.toLocaleLowerCase().startsWith(value[1].toLocaleLowerCase()) || 
                i.datum.endsWith(value[1]))
      })
    )

    this.income$ = this.periodQuery$.pipe(
      switchMap(query => this.incomeService.getIncomeList(query)) 
    )
    

    this.years$ = this.invoiceService.getYears()

    this.shopsAndCategories$ = combineLatest({
      shops$: this.shopService.getShops(),
      categories$: this.categoryService.getCategories(),
      invoices$: invoiceSource$,
      income: this.income$
    }).pipe(
      map(value => {return {
        shops: value.shops$,
        categories: value.categories$,
        invoices: value.invoices$,
        income: value.income
      }})
    )
  }

  ngOnDestroy(): void {
    
  }
}
