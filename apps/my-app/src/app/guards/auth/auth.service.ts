import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/my-app/src/environments/environment';
import { LoginUserDto } from 'libs/shared/util/dto/src/lib/loginUser.dto';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { LocalStorageService } from '../../shared/local-storage.service';
import { Credentials } from 'libs/api/feature/auth/src/lib/interfaces/credentials.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUri = 'auth/login'
  private _isLoggedIn = false;
  get isLoggedIn() : boolean {
    return this.localStorage.get('isLoggedIn') ?? false
  }

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }
  
  login(loginDto: LoginUserDto): Observable<boolean> {
    return this.http.post<Credentials>(`${environment.apiUrl}/${this.loginUri}`, loginDto)
    .pipe(
      map(response => {
        console.log("response", response)
        this.localStorage.set('isLoggedIn', JSON.stringify(true))
        this.localStorage.set('user', JSON.stringify(response))
        return true
      }),
      catchError(error => {
        this.localStorage.set('isLoggedIn', JSON.stringify(false))
        return of(false)
      })
    )
  }

  logout(): void {
    this.localStorage.set('isLoggedIn', JSON.stringify(false))
  }
}
