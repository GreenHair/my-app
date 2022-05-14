import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CategoryDto, ShopDto } from '@my-app/shared/util/dto';
import { CustomAdapter } from '@my-app/web/invoice/utils';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'my-app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
  ]
})
export class SearchFormComponent implements OnInit {

  @Input() categories: CategoryDto[]
  @Input() shops: ShopDto[]
  @Output() submitSearch: any = new EventEmitter<any>()

  constructor(private fb: FormBuilder) { }

  searchForm = this.fb.group({
    description: [''],
    amount: [''],
    amountSpec: ['0'],
    date1: [''],
    date2: [''],
    dateSpec: ['on'],
    category: [''],
    shop: [''],
    recurrency: ['all']
  })

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitSearch.emit(this.searchForm.value)
  }

}
