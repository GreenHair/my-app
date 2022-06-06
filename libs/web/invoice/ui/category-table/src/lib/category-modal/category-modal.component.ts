import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
    id: new FormControl(''),
    bezeichnung: new FormControl('', Validators.required),
    essen: new FormControl('')
  })

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit(): void {
    if(this.category !== undefined) {
      this.form.patchValue(this.category)
    }
  }

}
