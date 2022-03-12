import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { FamilienmitgliedDto } from 'libs/shared/util/dto/src/lib/familienmitglied.dto';
import { ShopDto } from 'libs/shared/util/dto/src/lib/shop.dto';
import { FamilyMemberService } from 'libs/web/shared/family-member/data-access/src/lib/family-member.service'
import { Invoice } from 'libs/web/shared/invoice/data-access/src/lib/invoice';
import { ShopService } from 'libs/web/shared/shop/data-access/src/lib/shop.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  model: NgbDateStruct;

  invoice: Invoice = new Invoice()

  familyMembers$ : Observable<FamilienmitgliedDto[]>
  shops$ : Observable<ShopDto[]>

  invoiceForm = this.fb.group({
    date: [''],
    laden: [''],
    person: [''],
    einmalig: [true]
  })

  constructor(
    private familyMemberService: FamilyMemberService,
    private shopService: ShopService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.familyMembers$ = this.familyMemberService.getShops()
    this.shops$ = this.shopService.getShops()
  }

  submit() {
    console.log(this.invoiceForm.getRawValue())
  }
}
