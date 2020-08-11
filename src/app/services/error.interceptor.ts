import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {

        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            return throwError('Email or password incorrect');
          }
          const applicationError = err.headers.get('Application-Error');
          if (applicationError) {
            return throwError(applicationError);
          }
          const serverError = err.error;
          let modalStateError = '';
          if (serverError.errors && typeof serverError.errors === 'object') {
            for (const key in serverError.errors) {
              if (serverError.errors[key]) {
                modalStateError += serverError.errors[key] + '\n';
              }
            }
          }
          return throwError(modalStateError || serverError || 'Server error');
        }
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};

