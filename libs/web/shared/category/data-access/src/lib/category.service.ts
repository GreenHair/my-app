import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/my-app/src/environments/environment';
import { CategoryDto } from 'libs/shared/util/dto/src/lib/category.dto';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = "category"
  private categories$ = new BehaviorSubject<CategoryDto[]>([])

  constructor(private http: HttpClient) { 
    this.http.get<CategoryDto[]>(`${environment.apiUrl}/${this.categoryUrl}`)
  }

  getCategories() : Observable<CategoryDto[]> {
    return this.categories$
  }
}
