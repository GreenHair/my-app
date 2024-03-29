import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, UntypedFormArray, UntypedFormBuilder, UntypedFormControl, ValidatorFn, Validators } from '@angular/forms';
import { compareById } from '@my-app/web/shared/utils';
import { Invoice, InvoiceService } from '@my-app/web/invoice/data-access';
import { ShopDto, FamilienmitgliedDto, CategoryDto, RechnungDto, AusgabenDto } from '@my-app/shared/util/dto';
import { retry } from 'rxjs';

export function ausgabenMinLengthValidator(minLength: number) : ValidatorFn {
  return (control: AbstractControl) => {
    const ausgaben = control as FormArray
    console.log("ausgaben", ausgaben)
    console.log("form array is invalid", ausgaben.length < minLength || ausgaben.controls.some(c => c.invalid))
    return ausgaben.length < minLength ? {error: {value: "Ausgaben too short"}} : allArticlesValidator() ;
  }
}

export function allArticlesValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const ausgaben = control as FormArray
    return ausgaben.controls.some(c => c.invalid) ? {error: {value: "some articles are invalid"}} : null
  }
}

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
    datum: [null, Validators.required],
    laden: ['', Validators.required],
    person: ['', Validators.required],
    einmalig: [true],
    ausgaben: this.fb.array([], [ausgabenMinLengthValidator(1), allArticlesValidator]),
    sum: ['']
  })

  get ausgaben() {
    return this.invoiceForm.get('ausgaben') as UntypedFormArray
  }
  get laden() {
    return this.invoiceForm.get('laden') as UntypedFormControl
  }
  get person() {
    return this.invoiceForm.get('person') as UntypedFormControl
  }

  constructor(private fb: UntypedFormBuilder, private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    console.log("date", this.invoiceForm.get('datum'))
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
    this.ausgaben.push(this.fb.control(null, allArticlesValidator))
  }

  deleteArticle(article: any) {
    const idx = this.ausgaben.controls.indexOf(article)
    this.ausgaben.removeAt(idx)
  }

  copyPrevious() {
    if(this.ausgaben.controls.length < 1) return
    const idx = this.ausgaben.controls.length - 1
    const value = this.ausgaben.controls[idx].value
    const clone = this.fb.control(value)
    this.ausgaben.push(clone)
  }

  submit() {
    if(this.invoiceForm.invalid){
      console.log(this.invoiceForm)
      this.invoiceForm.markAllAsTouched()
      return
    }
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
