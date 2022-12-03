import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@my-app/web/login/data-access';
import { environment } from 'apps/my-app/src/environments/environment';
import { FamilienmitgliedDto } from 'libs/shared/util/dto/src/lib/familienmitglied.dto';
import { NewFamilienmitgliedDto } from 'libs/shared/util/dto/src/lib/newFamilienmitglied.dto';
import { BehaviorSubject, Observable, retry, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamilyMemberService {

  private familyMemberUrl = "family-member"
  private familyMembers$ = new BehaviorSubject<FamilienmitgliedDto[]>([])

  constructor(private http: HttpClient, private authService: AuthService) {
    this.fetchData();
  }

  private fetchData() {
    this.http.get<FamilienmitgliedDto[]>(`${environment.apiUrl}/${this.familyMemberUrl}`).pipe(
      retry({delay: () => this.authService.userLogin()})
    )
      .subscribe(familyMembers => this.familyMembers$.next(familyMembers));
  }

  public getFamily() : Observable<FamilienmitgliedDto[]> {
    return this.familyMembers$
  }
}
