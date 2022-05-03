import { Component, OnInit, Input } from '@angular/core';
import { Invoice } from '@my-app/web/invoice/data-access';

@Component({
  selector: 'my-app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  @Input() invoices : Invoice[]

  constructor() { }

  ngOnInit(): void {
  }

}
