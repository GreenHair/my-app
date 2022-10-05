import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AusgabenDto, CategoryDto, ShopDto } from '@my-app/shared/util/dto';
import { Invoice } from '@my-app/web/invoice/data-access';
import { SumPipe } from '@my-app/web/shared/utils';
import { map, Observable, startWith, switchMap, tap } from 'rxjs';

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

  catSelect = new FormControl("")
  shopSelect = new FormControl("")
  fixedOrVariable = this.fb.group({
    fixVar: ['']
  })

  catInvoices$!: Observable<AusgabenDto[]>
  shopInvoices$!: Observable<Invoice[]>
  fixedOrVariableInvoices$!: Observable<Invoice[]>

  constructor(private sumPipe: SumPipe, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.catInvoices$ = this.catSelect.valueChanges.pipe(
      map(catId => 
        this.invoices.reduce((prev, curr) => prev.concat(curr.ausgaben), [] as AusgabenDto[])
        .filter(ausgabe => ausgabe.prodGr.id == catId)),
        startWith([])
    )

    this.shopInvoices$ = this.shopSelect.valueChanges.pipe(
      map(shopId => this.invoices.filter(i => i.laden.id == shopId)),
      startWith([])
    )

    this.fixedOrVariableInvoices$ = this.fixedOrVariable.valueChanges.pipe(
      tap(shopid => console.log("shop id", shopid)),
      map(val => {
        switch (val.fixVar) {
          case "variable":
            return this.invoices.filter(i => i.einmalig)
          case "fixed":
            return this.invoices.filter(i => !i.einmalig)
          default:
            return []
        }
      }),
      startWith([])
    )
  }

}
