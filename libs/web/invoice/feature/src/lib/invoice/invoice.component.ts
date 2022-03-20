import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { plainToClass } from 'class-transformer';
import { FamilienmitgliedDto } from 'libs/shared/util/dto/src/lib/familienmitglied.dto';
import { NewRechnungDto } from 'libs/shared/util/dto/src/lib/newRechnung.dto';
import { RechnungDto } from 'libs/shared/util/dto/src/lib/rechnung.dto';
import { ShopDto } from 'libs/shared/util/dto/src/lib/shop.dto';
import { FamilyMemberService } from 'libs/web/shared/family-member/data-access/src/lib/family-member.service'
import { InvoiceService } from 'libs/web/shared/invoice/data-access/src/lib/invoice.service'
import { Invoice } from 'libs/web/shared/invoice/data-access/src/lib/invoice';
import { ShopService } from 'libs/web/shared/shop/data-access/src/lib/shop.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {

  //model: NgbDateStruct;

  invoice: Invoice = new Invoice()

  familyMembers$ : Observable<FamilienmitgliedDto[]>
  shops$ : Observable<ShopDto[]>

  invoiceForm = this.fb.group({
    id: [''],
    date: [''],
    laden: [''],
    person: [''],
    einmalig: [true],
    ausgaben: this.fb.array([
      this.fb.control('')
    ]),
    sum: ['']
  })

  constructor(
    private familyMemberService: FamilyMemberService,
    private shopService: ShopService,
    private invoiceService: InvoiceService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.familyMembers$ = this.familyMemberService.getShops()
    this.shops$ = this.shopService.getShops()
    
    this.ausgaben.valueChanges.subscribe(() => {
      const sum = this.ausgaben.getRawValue().map(a => a.betrag)
        .reduce((previous, current) => current ? previous + current : previous, 0)
      this.invoiceForm.get('sum')?.patchValue(sum)
    })
  }

  get ausgaben() {
    return this.invoiceForm.get('ausgaben') as FormArray
  }

  addArticle() {
    this.ausgaben.push(this.fb.control(''))
  }

  submit() {
    //console.log(this.invoiceForm.getRawValue())
    const rawValue = this.invoiceForm.getRawValue()
    const rechnungDto: RechnungDto = {
      ...rawValue,
      datum: `${rawValue.date.year}-${rawValue.date.month}-${rawValue.date.day}`,
      einmalig: Number(rawValue.einmalig)
    }
    //console.log(rechnungDto)
    this.invoiceService.saveInvoice(rechnungDto).subscribe(() => {
      this.invoiceForm.reset()
    })
  }
}
