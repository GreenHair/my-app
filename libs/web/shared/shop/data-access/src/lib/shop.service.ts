import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/my-app/src/environments/environment';
import { ShopDto } from 'libs/shared/util/dto/src/lib/shop.dto';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private shopUrl = `${environment.apiUrl}/shop`
  private shops$ = new BehaviorSubject<ShopDto[]>([])

  constructor(private http: HttpClient) { 
    this.fetchShops();
  }

  private fetchShops() {
    this.http.get<ShopDto[]>(this.shopUrl)
      .subscribe(shops => this.shops$.next(shops));
  }

  getShops() : Observable<ShopDto[]> {
    return this.shops$
  }

  public save(shop: ShopDto): Observable<ShopDto> {
    let observable;
    if(shop.id > 0) {
      observable = this.http.put<ShopDto>(`${this.shopUrl}/${shop.id}`, shop)
    } else {
      observable = this.http.post<ShopDto>(this.shopUrl, shop)
    }
    return observable.pipe(
      tap(_ => this.fetchShops())
    )
  }

  public delete(id: number): Observable<Object> {
    return this.http.delete(`${this.shopUrl}/${id}`).pipe(
      tap(_ => this.fetchShops()),
      catchError(error => {throw(error)})
    )
  }
}
