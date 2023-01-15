import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { ShopDto } from '@my-app/shared/util/dto';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'my-app-shop-modal',
  templateUrl: './shop-modal.component.html',
  styleUrls: ['./shop-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopModalComponent implements OnInit {

  @Input() shop!: ShopDto

  form = this.fb.group({
    id: new UntypedFormControl(),
    name: new UntypedFormControl('', Validators.required),
    online: new UntypedFormControl(false)
  })
  
  constructor(public activeModal: NgbActiveModal, private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    if(this.shop !== undefined) {
      this.form.patchValue(this.shop)
    }
  }

}
