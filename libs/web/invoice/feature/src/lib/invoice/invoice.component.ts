import { Component, Injectable, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { plainToClass } from 'class-transformer';
import { FamilienmitgliedDto } from 'libs/shared/util/dto/src/lib/familienmitglied.dto';
import { RechnungDto } from 'libs/shared/util/dto/src/lib/rechnung.dto';
import { ShopDto } from 'libs/shared/util/dto/src/lib/shop.dto';
import { FamilyMemberService } from 'libs/web/shared/family-member/data-access/src/lib/family-member.service'
import { InvoiceService } from 'libs/web/shared/invoice/data-access/src/lib/invoice.service'
import { Invoice } from 'libs/web/shared/invoice/data-access/src/lib/invoice';
import { ShopService } from 'libs/web/shared/shop/data-access/src/lib/shop.service'
import { Observable } from 'rxjs';
import { compareById } from '@my-app/web/shared/utils';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[2], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[0], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.year + this.DELIMITER + date.month + this.DELIMITER + date.day : null;
  }
}


@Component({
  selector: 'my-app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
  ]
})
export class InvoiceComponent implements OnInit {

  invoice: Invoice = new Invoice()

  familyMembers$ : Observable<FamilienmitgliedDto[]>
  shops$ : Observable<ShopDto[]>

  invoiceForm = this.fb.group({
    id: [''],
    datum: [''],
    laden: [''],
    person: [''],
    einmalig: [true],
    ausgaben: this.fb.array([]),
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
      const sum = this.ausgaben.getRawValue().map(a => a ? a.betrag : 0)
        .reduce((previous, current) => current ? previous + current : previous, 0)
      this.invoiceForm.get('sum')?.patchValue(sum)
    })

    console.log(history.state)
    if(history.state.data) {
      this.invoice = plainToClass(Invoice, history.state.data)
      for(let i = 0; i < this.invoice.ausgaben.length; i++) {
        this.addArticle()
      }
      this.invoiceForm.patchValue(this.invoice)
      console.log(this.invoice.date)
    }
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
      einmalig: Number(rawValue.einmalig)
    }
    //console.log(rechnungDto)
    this.invoiceService.saveInvoice(rechnungDto).subscribe(() => {
      this.invoiceForm.reset()
      this.ausgaben.clear()
    })
  }

  compareId(obj1: any, obj2: any) : boolean {
    return compareById(obj1, obj2)
    //return shop1?.id === shop2?.id
  }

  
}
