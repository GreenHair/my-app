import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { ShopDto } from '@my-app/shared/util/dto';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'my-app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css'],
})
export class ConfirmDeleteComponent implements OnInit {
  
  @Input() shop: ShopDto
  @Input() errorMessage: string = ""
  @Output() deleteClick = new EventEmitter<number>()

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
