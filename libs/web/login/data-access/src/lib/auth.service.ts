import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'apps/my-app/src/environments/environment';
import { Credentials } from 'libs/shared/util/dto/src/lib/credentials.dto';
import { LoginUserDto } from 'libs/shared/util/dto/src/lib/loginUser.dto';
import { LocalStorageService } from 'libs/web/shared/local-storage-service/src/lib/local-storage.service';
import { catchError, map, Observable, of, BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUri = 'auth/login'
  private _isLoggedIn = false;
  error: any
  private _userLogin$ = new BehaviorSubject<boolean>(false)
  
  get isLoggedIn() : boolean {
    return this.localStorage.get('isLoggedIn') ?? false
  }

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  constructor(private http: HttpClient, private localStorage: LocalStorageService, private router: Router) { }
  
  login(loginDto: LoginUserDto): Observable<boolean> {
    return this.http.post<Credentials>(`${environment.apiUrl}/${this.loginUri}`, loginDto)
    .pipe(
      map(response => {
        this.localStorage.set('isLoggedIn', JSON.stringify(true))
        this.localStorage.set('user', JSON.stringify(response))
        this._userLogin$.next(true)
        return true
      }),
      catchError(error => {
        console.log(error)
        this.error = error
        this.localStorage.set('isLoggedIn', JSON.stringify(false))
        return of(false)
      })
    )
  }

  logout(): void {
    this.localStorage.set('user', '')
    this.localStorage.set('isLoggedIn', JSON.stringify(false))
    this.router.navigateByUrl('login')  
  }

  userLogin(): Observable<boolean> {
    return this._userLogin$
    .pipe(
     filter(val => val) 
    )
  }
}
