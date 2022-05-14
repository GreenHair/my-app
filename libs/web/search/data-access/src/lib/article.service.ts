import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AusgabenQuery } from '@my-app/shared/util/dto';
import { environment } from 'apps/my-app/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  searchArticle(query: AusgabenQuery) {
    const params = new HttpParams({
      fromObject: {...query}
    })
    return this.http.get(`${environment.apiUrl}/article/search`, {params: params})
  }
}
