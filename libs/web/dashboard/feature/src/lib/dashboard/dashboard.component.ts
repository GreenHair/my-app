import { Component, OnDestroy, OnInit } from '@angular/core';
import { EinkommenDto } from '@my-app/shared/util/dto';
import { IncomeService } from '@my-app/web/income/data-access';
import { Invoice, InvoiceService } from '@my-app/web/invoice/data-access';
import { map, Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  invoices$: Observable<Invoice[]>
  incomeSubscription: Subscription
  sumOut: number = 0
  sumIn: number = 0

  get balance() : number {
    return this.sumIn - this.sumOut
  }

  constructor(private invoiceService: InvoiceService, private incomeService: IncomeService) { }

  ngOnInit(): void {
    this.invoices$ = this.invoiceService.getInvoices().pipe(
      tap(invoices => this.sumOut = invoices.map(i => i.sum).reduce((prev, curr) => prev + curr, 0)),
      map(invoices => {
        console.log("invoices", invoices)
        return invoices.sort((a, b) => b.date.getTime() - a.date.getTime())
      })
    )

    this.incomeSubscription = this.incomeService.getIncomeList().subscribe(
      income => {
        console.log("income", income)
        this.sumIn = income.map(i => i.betrag).reduce((prev, curr) => prev + curr, 0)
      })
  }

  ngOnDestroy(): void {
      this.incomeSubscription.unsubscribe()
  }
}
