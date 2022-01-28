import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn = false;
  get isLoggedIn() : boolean {
    return this.localStorage.get('isLoggedIn') ?? false
  }

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }
  
  login(username: string, password:string): Observable<boolean> {
    return this.http.post('http://localhost:4000/auth/login', {name: username, password: password})
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
