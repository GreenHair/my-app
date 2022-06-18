import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopDto } from '@my-app/shared/util/dto'
@Component({
  selector: 'my-app-shop-table',
  templateUrl: './shop-table.component.html',
  styleUrls: ['./shop-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopTableComponent implements OnInit {

  @Input() shops: ShopDto[]
  @Input() searchTerm: any
  @Output() editClick = new EventEmitter<ShopDto>()
  @Output() deleteClick = new EventEmitter<ShopDto>()

  constructor() { }

  ngOnInit(): void {
  }

}
