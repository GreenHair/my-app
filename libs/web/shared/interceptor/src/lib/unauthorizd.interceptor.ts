import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "libs/web/login/data-access/src/lib/auth.service";
import { catchError, Observable, Subject, throttleTime, throwError } from "rxjs";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
    
    private throttleLogout = new Subject();
    constructor(private authService: AuthService) {
        this.throttleLogout.pipe(throttleTime(5000)).subscribe(url => {
            this.authService.logout()
        });
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.throttleLogout.next(undefined)
                }
                return throwError(() => error)
            })
        )
    }

}