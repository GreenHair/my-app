import { Component, OnInit } from '@angular/core';
import { Invoice, InvoiceService } from '@my-app/web/invoice/data-access';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  invoices$: Observable<Invoice[]>

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.invoices$ = this.invoiceService.getInvoices().pipe(
      map(invoices => {
        console.log("invoices", invoices)
        return invoices.sort((a,b) => b.date.getTime() - a.date.getTime())
      })
    )
  }

}
