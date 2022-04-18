import { Component, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { FamilienmitgliedDto } from 'libs/shared/util/dto/src/lib/familienmitglied.dto';
import { ShopDto } from 'libs/shared/util/dto/src/lib/shop.dto';
import { FamilyMemberService } from 'libs/web/shared/family-member/data-access/src/lib/family-member.service'
import { Invoice } from '@my-app/web/invoice/data-access';
import { ShopService } from 'libs/web/shared/shop/data-access/src/lib/shop.service'
import { Observable } from 'rxjs';
import { CategoryDto } from 'libs/shared/util/dto/src/lib/category.dto';
import { CategoryService } from 'libs/web/shared/category/data-access/src/lib/category.service';

@Component({
  selector: 'my-app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoice: Invoice = new Invoice()

  familyMembers$ : Observable<FamilienmitgliedDto[]>
  shops$ : Observable<ShopDto[]>
  categories$ : Observable<CategoryDto[]>

  constructor(
    private familyMemberService: FamilyMemberService,
    private shopService: ShopService,
    private categoryService: CategoryService
    ) { }

  ngOnInit(): void {
    this.familyMembers$ = this.familyMemberService.getShops()
    this.shops$ = this.shopService.getShops()
    this.categories$ = this.categoryService.getCategories()

    console.log(history.state)
    if(history.state.data) {
      this.invoice = plainToClass(Invoice, history.state.data)
      console.log(this.invoice.date)
    }
  }
}
