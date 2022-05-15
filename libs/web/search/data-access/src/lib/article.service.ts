import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AusgabenQuery, AusgabenQueryResultDto } from '@my-app/shared/util/dto';
import { environment } from 'apps/my-app/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  searchArticle(query: AusgabenQuery): Observable<AusgabenQueryResultDto[]> {
    const params = new HttpParams({
      fromObject: {...query}
    })
    return this.http.get<AusgabenQueryResultDto[]>(`${environment.apiUrl}/article/search`, {params: params})
  }
}
