import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/my-app/src/environments/environment';
import { CategoryDto } from 'libs/shared/util/dto/src/lib/category.dto';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = "category"
  private url = `${environment.apiUrl}/${this.categoryUrl}`
  private categories$ = new BehaviorSubject<CategoryDto[]>([])

  constructor(private http: HttpClient) { 
    this.fetchCategories()
  }

  private fetchCategories() : void {
    this.http.get<CategoryDto[]>(this.url)
    .subscribe(categories => this.categories$.next(categories))
  }

  getCategories() : Observable<CategoryDto[]> {
    return this.categories$
  }

  getByArticle(article: string) : Observable<CategoryDto> {
    const params = new HttpParams()
    return this.http.get<CategoryDto[]>(this.url, { params : params.set("article", article)})
    .pipe(
      map(category => category[0])
    )
  }

  save(category: CategoryDto): Observable<CategoryDto> {
    let observable;
    if(category.id > 0) {
      observable = this.http.put<CategoryDto>(`${this.url}/${category.id}`, category)
    } else {
      observable = this.http.post<CategoryDto>(this.url, category)
    }
    return observable.pipe(
      tap(_ => this.fetchCategories())
    )
  }
}
