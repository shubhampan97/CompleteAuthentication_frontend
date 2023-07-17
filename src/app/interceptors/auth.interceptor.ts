import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  refreshed = false;
  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      setHeaders:{
        Authorization : `Bearer ${this.authService.accessToken}`
      }
    })
    
    return next.handle(req).pipe(catchError((err : HttpErrorResponse)=>{
      if(err.status === 401 && !this.refreshed){
        this.refreshed = true;
        return this.authService.refresh().pipe(
          switchMap((res:any)=>{
            this.authService.accessToken = res.token;

            return next.handle(request.clone({
              setHeaders:{
                Authorization: `Bearer ${this.authService.accessToken}`
              }
            }))
          })
        )
      }

      this.refreshed = false;
      return throwError(()=>err);
    }));
  }
}
