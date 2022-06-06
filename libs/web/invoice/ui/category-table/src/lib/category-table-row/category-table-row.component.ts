import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { CategoryDto } from '@my-app/shared/util/dto';

@Component({
  selector: 'my-app-category-table-row',
  templateUrl: './category-table-row.component.html',
  styleUrls: ['./category-table-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTableRowComponent implements OnInit {
  @Input() category: CategoryDto
  constructor() { }

  ngOnInit(): void {
  }

}
