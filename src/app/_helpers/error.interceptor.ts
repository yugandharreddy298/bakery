import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// import { _throw } from 'rxjs/observable/throw'
import { catchError } from 'rxjs/operators';
import { GeneralService } from '../services/general.service';
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private generalService: GeneralService,private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log(err +"***********")
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.generalService.logout();                // location.reload(true);
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}