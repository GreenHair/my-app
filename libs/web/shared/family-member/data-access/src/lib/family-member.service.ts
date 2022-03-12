import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/my-app/src/environments/environment';
import { FamilienmitgliedDto } from 'libs/shared/util/dto/src/lib/familienmitglied.dto';
import { NewFamilienmitgliedDto } from 'libs/shared/util/dto/src/lib/newFamilienmitglied.dto';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamilyMemberService {

  private familyMemberUrl = "family-member"
  private familyMembers$ = new BehaviorSubject<FamilienmitgliedDto[]>([])

  constructor(private http: HttpClient) { 
    this.http.get<FamilienmitgliedDto[]>(`${environment.apiUrl}/${this.familyMemberUrl}`)
    .subscribe(familyMembers => this.familyMembers$.next(familyMembers))
  }

  public getShops() : Observable<FamilienmitgliedDto[]> {
    return this.familyMembers$
  }
}
