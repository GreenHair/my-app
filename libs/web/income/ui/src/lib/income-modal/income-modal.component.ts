import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { EinkommenDto, FamilienmitgliedDto } from '@my-app/shared/util/dto';
import { CustomAdapter } from '@my-app/web/invoice/utils';
import { compareById } from '@my-app/web/shared/utils';
import { NgbActiveModal, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app-income-modal',
  templateUrl: './income-modal.component.html',
  styleUrls: ['./income-modal.component.css'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
  ]
})
export class IncomeModalComponent implements OnInit, OnChanges {

  @Input() family!: Observable<FamilienmitgliedDto[]>
  @Input() data?: EinkommenDto

  form = this.fb.group({
    nr: new UntypedFormControl(),
    datum: new UntypedFormControl('', Validators.required),
    bezeichnung: new UntypedFormControl('', Validators.required),
    person: new UntypedFormControl('', Validators.required),
    betrag: new UntypedFormControl('', Validators.required)
  })

  constructor(public activeModal: NgbActiveModal, private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    console.log("family length", this.family)
    console.log("data", this.data)
    if(this.data !== undefined) {
      this.form.patchValue(this.data)
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("simplechange in model",changes)
  }

  compareId(obj1: any, obj2: any) : boolean {
    return compareById(obj1, obj2)
  }

}
