import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder } from '@angular/forms';
import { compareById } from '@my-app/web/shared/utils';
import { Invoice, InvoiceService } from '@my-app/web/invoice/data-access';
import { ShopDto, FamilienmitgliedDto, CategoryDto, RechnungDto } from '@my-app/shared/util/dto';


@Component({
  selector: 'my-app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css'],
})
export class InvoiceFormComponent implements OnChanges, OnInit {

  @Input() invoice: Invoice
  @Input() shops: ShopDto[] | null
  @Input() family: FamilienmitgliedDto[] | null
  @Input() categories: CategoryDto[] | null

  invoiceForm = this.fb.group({
    id: [],
    datum: [''],
    laden: [''],
    person: [''],
    einmalig: [true],
    ausgaben: this.fb.array([]),
    sum: ['']
  })

  get ausgaben() {
    return this.invoiceForm.get('ausgaben') as UntypedFormArray
  }

  constructor(private fb: UntypedFormBuilder, private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.ausgaben.valueChanges.subscribe(() => {
      const sum: number = this.ausgaben.getRawValue().map(a => a ? a.betrag : 0)
        .reduce((previous, current) => current ? previous + current : previous, 0)
      this.invoiceForm.get('sum')?.patchValue(sum.toFixed(2))
    })
    //console.log("ng on init" ,this.invoice)
    if(this.invoice && this.invoice.ausgaben) {
      for(let i = 0; i < this.invoice.ausgaben.length; i++) {
        this.addArticle()
      }
      this.invoiceForm.patchValue(this.invoice)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log("on changes", changes)
    // if(changes['invoice'] && this.invoice.ausgaben) {

    //   for(let i = 0; i < this.invoice.ausgaben.length; i++) {
    //     this.addArticle()
    //   }
    //   this.invoiceForm.patchValue(this.invoice)
    // }
  }

  addArticle() {
    this.ausgaben.push(this.fb.control(''))
  }

  deleteArticle(article: any) {
    // console.log(article)
    // console.log(article.value)
    // console.log(article.value.id)
    // const ctrl = this.ausgaben.controls.find(a => a == article)
    // console.log(ctrl)
    const idx = this.ausgaben.controls.indexOf(article)
    // console.log("index:",idx)
    if (article.value == "" || article.value.id == "")
      this.ausgaben.controls.splice(idx, 1)
  }

  copyPrevious() {
    if(this.ausgaben.controls.length < 1) return
    const idx = this.ausgaben.controls.length - 1
    const value = this.ausgaben.controls[idx].value
    const clone = this.fb.control(value)
    this.ausgaben.push(clone)
  }

  submit() {
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
    this.invoiceService.saveInvoice(rechnungDto).subscribe((response) => {
      this.invoiceForm.reset()
      this.ausgaben.clear()
    })
  }  

  compareId(obj1: any, obj2: any) : boolean {
    return compareById(obj1, obj2)
  }
}
