import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { CategoryDto } from '@my-app/shared/util/dto';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'my-app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryModalComponent implements OnInit {
  @Input() category: CategoryDto

  form = this.fb.group({
    id: new UntypedFormControl(''),
    bezeichnung: new UntypedFormControl('', Validators.required),
    essen: new UntypedFormControl('')
  })

  constructor(public activeModal: NgbActiveModal, private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    if(this.category !== undefined) {
      this.form.patchValue(this.category)
    }
  }

}
