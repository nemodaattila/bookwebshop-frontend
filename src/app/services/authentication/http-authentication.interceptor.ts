import {Injectable, Injector} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {LoggedUserService} from "./logged-user.service";
import {catchError, tap} from "rxjs/operators";
import {GlobalMessageDisplayerService} from "../helper/global-message-displayer.service";

@Injectable()
/**
 * interceptor class for intercepting http requests and responses
 */
export class HttpAuthenticationInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, private messageService: GlobalMessageDisplayerService) {
  }

  /**
   * intercepts http requests / responses,
   * with request: adds withCredentials header, if authentication token exists adds it as custom header
   * (Authentication)
   * with response: if response is HttpErrorResponse, passes error to display it,
   * if HttpResponse and TokenExpirationTime custom header exists, passes it's value to LoggedUserService
   * @param request
   * @param next
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request)
    const auth = this.injector.get(LoggedUserService);
    request = request.clone({
      withCredentials: true
    })
    if (auth.getToken() !== null) {
      console.log(auth.getToken())
      request = request.clone({
        headers: request.headers.set('Authorization', auth.getToken() as string),
      })
    }
    console.log(request)

    return next.handle(request).pipe(
      tap((httpEvent: HttpEvent<any>) => {
        if (httpEvent.type === 0) {
          return;
        }
        console.log(httpEvent);
        console.log((httpEvent as HttpResponse<any>).body.data)
        if ((httpEvent as any) instanceof HttpResponse) {
          let expTime = (httpEvent as HttpResponse<any>).headers.get('TokenExpirationTime');
          if (expTime !== null) {
            auth.setTokenExpiringTime(Number(expTime))
          }
        }
        return httpEvent
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error)
        console.log(error.error)
        this.messageService.displayError('BEE', error, error.url as string)
        return throwError(error);
      })
    );
  }

}
