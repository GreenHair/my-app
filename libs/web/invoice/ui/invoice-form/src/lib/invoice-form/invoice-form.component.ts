import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { compareById } from '@my-app/web/shared/utils';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { CategoryDto } from 'libs/shared/util/dto/src/lib/category.dto';
import { FamilienmitgliedDto } from 'libs/shared/util/dto/src/lib/familienmitglied.dto';
import { RechnungDto } from 'libs/shared/util/dto/src/lib/rechnung.dto';
import { ShopDto } from 'libs/shared/util/dto/src/lib/shop.dto';
import { Invoice } from 'libs/web/invoice/data-access/src/lib/invoice';
import { InvoiceService } from 'libs/web/invoice/data-access/src/lib/invoice.service';
import { EventEmitter } from 'stream';
import { CustomAdapter } from './custom-date-adapter';

@Component({
  selector: 'my-app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
  ]
})
export class InvoiceFormComponent implements OnChanges, OnInit {

  @Input() invoice: Invoice
  @Input() shops: ShopDto[] | null
  @Input() family: FamilienmitgliedDto[] | null
  @Input() categories: CategoryDto[] | null

  invoiceForm = this.fb.group({
    id: [''],
    datum: [''],
    laden: [''],
    person: [''],
    einmalig: [true],
    ausgaben: this.fb.array([]),
    sum: ['']
  })

  get ausgaben() {
    return this.invoiceForm.get('ausgaben') as FormArray
  }

  constructor(private fb: FormBuilder, private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.ausgaben.valueChanges.subscribe(() => {
      const sum: number = this.ausgaben.getRawValue().map(a => a ? a.betrag : 0)
        .reduce((previous, current) => current ? previous + current : previous, 0)
      this.invoiceForm.get('sum')?.patchValue(sum.toFixed(2))
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("on changes", changes)
    if(changes['invoice'] && this.invoice.ausgaben) {

      for(let i = 0; i < this.invoice.ausgaben.length; i++) {
        this.addArticle()
      }
      this.invoiceForm.patchValue(this.invoice)
    }
  }

  addArticle() {
    this.ausgaben.push(this.fb.control(''))
  }

  submit() {
    //console.log("raw", this.invoiceForm.getRawValue())
    const rawValue = this.invoiceForm.getRawValue()
    rawValue.ausgaben.forEach((element: any) => {
      if(element.id == "") {
        delete element.id
      }
    });
    const rechnungDto: RechnungDto = {
      ...rawValue,
      einmalig: Number(rawValue.einmalig)
    }
    //console.log("dto", rechnungDto)
    this.invoiceService.saveInvoice(rechnungDto).subscribe((response) => {
      this.invoiceForm.reset()
      this.ausgaben.clear()
    })
  }  

  compareId(obj1: any, obj2: any) : boolean {
    return compareById(obj1, obj2)
    //return shop1?.id === shop2?.id
  }
}