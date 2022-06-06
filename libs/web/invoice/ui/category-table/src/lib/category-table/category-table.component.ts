import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { CategoryDto } from '@my-app/shared/util/dto';

@Component({
  selector: 'my-app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTableComponent implements OnInit {
  @Input() categories: CategoryDto[]
  constructor() { }

  ngOnInit(): void {
  }

}
