import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CategoryDto } from '@my-app/shared/util/dto';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'my-app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDeleteComponent implements OnInit {
  @Input() category: CategoryDto
  @Input() errorMessage: string = ""
  @Output() deleteClick = new EventEmitter<number>()

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
