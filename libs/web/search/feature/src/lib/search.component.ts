import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AusgabenQuery, AusgabenQueryResultDto, CategoryDto, ShopDto } from '@my-app/shared/util/dto';
import { ArticleService } from '@my-app/web/search/data-access';
import { CategoryService } from '@my-app/web/shared/category/data-access';
import { ShopService } from '@my-app/web/shared/shop/data-access';
import { filter, forkJoin, map, Observable, Subject, take, tap } from 'rxjs';
import { SearchresultRow } from '@my-app/web/search/utils'

interface shopsCats {
  shops: ShopDto[],
  cats: CategoryDto[]
}

@Component({
  selector: 'my-app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private catService: CategoryService, private shopService: ShopService, private articleSercive: ArticleService) { }

  categories$: Observable<CategoryDto[]>
  shops$: Observable<ShopDto[]>
  result$ = new Subject<SearchresultRow[]>()

  data$: Observable<{shops: ShopDto[], categories: CategoryDto[]}>

  ngOnInit(): void {
    this.data$ = forkJoin({
      shops: this.shopService.getShops().pipe(
        filter(shops => shops.length > 0),
        take(1)
      ),
      categories: this.catService.getCategories().pipe(
        filter(cats => cats.length > 0),
        take(1)
      )
    })
  }

  search(values: any) {
    this.articleSercive.searchArticle(values).pipe(
      map(result => {
        const search = result.map(row => { return {
          datum: row.rechnungsnr.datum,
          bezeichnung: row.bezeichnung,
          betrag: row.betrag,
          laden: row.rechnungsnr.laden.name,
          kategorie: row.prodGr.bezeichnung,
          person: row.rechnungsnr.person.vorname}
        })
        return search
      })
    )
    .subscribe(result => this.result$.next(result))
  }

}
