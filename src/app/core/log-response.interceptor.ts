import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogResponceInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`LogResponceInterceptor - ${req.url}`);

    return next.handle(req)
      .pipe(
        tap(
          (event) => {
            if (event.type === HttpEventType.Response) {
              console.log(event.body);
            }
          }
        )
      );
  }
}
