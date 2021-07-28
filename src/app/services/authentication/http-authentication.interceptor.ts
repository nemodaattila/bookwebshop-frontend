import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {UserService} from "./user.service";
import {LoggedUserService} from "./logged-user.service";
import {catchError, map, tap} from "rxjs/operators";
import {GlobalMessageDisplayerService} from "../helper/global-message-displayer.service";

@Injectable()
export class HttpAuthenticationInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, private messageService: GlobalMessageDisplayerService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const auth = this.injector.get(LoggedUserService);
    console.log(auth.getToken())
    request = request.clone({
      withCredentials: true
    })
    if (auth.getToken() !== null) {
      request = request.clone({
        headers: request.headers.set('Authorization', auth.getToken() as string),
      })
    }
    console.log(request)

    return next.handle(request).pipe(
      map((event => {
        console.log(event)
        return event
      })),
      catchError((error: HttpErrorResponse) => {
        console.log(error)
        this.messageService.displayError('BEE', error, error.url as string)
        return throwError(error);
      })
    )
    //     console.log(event)
    //     if (event instanceof HttpResponse)
    //     {
    //       if (event.body.data.tokenExpires !== undefined)
    //       {
    //         auth.setTokenExpiringTime(event.body.data.tokenExpires)
    //       }
    //       // console.log(auth.getToken())
    //     }
    //     return event
    //   }));
    //
    //
    //
    //
    //
    // }
    // console.log(reqWithCred)
    // return (auth.getToken() !== null)?au
    // return next.handle(reqWithCred);
  }

}
