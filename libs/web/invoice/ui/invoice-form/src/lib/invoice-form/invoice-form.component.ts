import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Invoice } from 'libs/web/invoice/data-access/src/lib/invoice';

@Component({
  selector: 'my-app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnChanges {

  @Input() invoice: Invoice
  @Output() onSubmit: () => {}

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("on changes", changes)
  }


}
