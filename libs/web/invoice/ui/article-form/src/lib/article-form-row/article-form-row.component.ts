import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoryDto } from 'libs/shared/util/dto/src/lib/category.dto';
import { Observable } from 'rxjs';
import  { CategoryService } from 'libs/web/shared/category/data-access/src/lib/category.service'

@Component({
  selector: 'my-app-article-form-row',
  templateUrl: './article-form-row.component.html',
  styleUrls: ['./article-form-row.component.css']
})
export class ArticleFormRowComponent implements OnInit {

  categories$ : Observable<CategoryDto[]>

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories()
  }

}
