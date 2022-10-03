import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AusgabenDto, CategoryDto, ShopDto } from '@my-app/shared/util/dto';
import { Invoice } from '@my-app/web/invoice/data-access';
import { SumPipe } from '@my-app/web/shared/utils';
import { map, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'my-app-quick-info',
  templateUrl: './quick-info.component.html',
  styleUrls: ['./quick-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickInfoComponent implements OnInit {

  @Input() categories!: CategoryDto[]
  @Input() shops!: ShopDto[]
  @Input() invoices!: Invoice[]

  catSelect = new FormControl()
  shopSelect = new FormControl()
  fixedOrVariable = new FormControl()

  catInvoices$!: Observable<AusgabenDto[]>
  shopInvoices$!: Observable<Invoice[]>
  fixedOrVariableInvoices$!: Observable<Invoice[]>

  constructor(private sumPipe: SumPipe) { }

  ngOnInit(): void {
    this.catInvoices$ = this.catSelect.valueChanges.pipe(
      map(catId => 
        this.invoices.reduce((prev, curr) => prev.concat(curr.ausgaben), [] as AusgabenDto[])
        .filter(ausgabe => ausgabe.prodGr.id == catId))
    )

    this.shopInvoices$ = this.shopSelect.valueChanges.pipe(
      map(shopId => this.invoices.filter(i => i.laden.id == shopId))
    )

    this.fixedOrVariableInvoices$ = this.fixedOrVariable.valueChanges.pipe(
      tap(shopid => console.log("shop id", shopid)),
      map(val => {
        switch (val) {
          case "variable":
            return this.invoices.filter(i => i.einmalig)
          case "fixed":
            return this.invoices.filter(i => !i.einmalig)
          default:
            return []
        }
      })
    )
  }

}
