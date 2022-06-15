import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ShopDto } from '@my-app/shared/util/dto';
import { ConfirmDeleteComponent, ShopModalComponent } from '@my-app/web/invoice/ui/shop-table';
import { ShopService } from '@my-app/web/shared/shop/data-access';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, map, Observable, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'my-app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  shops$: Observable<ShopDto[]>
  search: FormControl = new FormControl('')
  constructor(private service: ShopService, private modalService: NgbModal) { }

  ngOnInit(): void {
    const shops$ = this.service.getShops()
    const search$ = this.search.valueChanges.pipe(startWith(''))
    this.shops$ = combineLatest([shops$, search$]).pipe(
      map(values => values[0].filter(shop => shop.name.toLowerCase().includes(values[1].toLowerCase())))
    )
  }

  openModal(shop: ShopDto | undefined = undefined) {
    const modalRef = this.modalService.open(ShopModalComponent)
    if(shop !== undefined) {
      modalRef.componentInstance.shop = shop
    }
    modalRef.closed.pipe(
      switchMap(value => this.service.save(value))
    ).subscribe(value => console.log("saving shop", value))
  }

  confirmDelete(shop: ShopDto) {
    const modalRef = this.modalService.open(ConfirmDeleteComponent)
    modalRef.componentInstance.shop = shop
    modalRef.componentInstance.deleteClick.pipe(
      switchMap(id => this.service.delete(Number(id)))
    ).subscribe({
      next: () => modalRef.close(),
      error: (err: HttpErrorResponse) => {console.log(err);modalRef.componentInstance.errorMessage = err.error.message}
    })
  }
}
