import { Component, OnInit } from '@angular/core';
import { RechnungDto } from 'libs/shared/util/dto/src/lib/rechnung.dto';
import { Invoice } from 'libs/web/invoice/data-access/src/lib/invoice';
import { InvoiceService } from 'libs/web/invoice/data-access/src/lib/invoice.service';
import { filter, map, Observable } from 'rxjs';

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
