import { Component, OnInit } from '@angular/core';
import { CategoryDto } from '@my-app/shared/util/dto';
import { CategoryService } from '@my-app/web/shared/category/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories$: Observable<CategoryDto[]>
  constructor(private service: CategoryService) { }

  ngOnInit(): void {
    this.categories$ = this.service.getCategories()
  }

}
