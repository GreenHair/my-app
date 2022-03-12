import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/my-app/src/environments/environment';
import { ShopDto } from 'libs/shared/util/dto/src/lib/shop.dto';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private shopUrl = "shop"
  private shops$ = new BehaviorSubject<ShopDto[]>([])

  constructor(private http: HttpClient) { 
    this.http.get<ShopDto[]>(`${environment.apiUrl}/${this.shopUrl}`)
    .subscribe(shops => this.shops$.next(shops))
  }

  getShops() : Observable<ShopDto[]> {
    return this.shops$
  }
}
