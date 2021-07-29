import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse, HttpHeaders, HttpHeaderResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {UserService} from "./user.service";
import {LoggedUserService} from "./logged-user.service";
import {catchError, first, map, tap} from "rxjs/operators";
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
      tap((httpEvent: HttpEvent<any>) => {
        // Skip request
        if (httpEvent.type === 0) {
          return;
        }
        console.log("response: ", httpEvent);

        let minTargetApiVersion: string;
        if ((httpEvent as any) instanceof HttpResponse) {
          let expTime = (httpEvent as HttpResponse<any>).headers.get("TokenExpirationTime");
          console.log(expTime)
          if (expTime !== null) {
            console.log(Number(expTime))
            auth.setTokenExpiringTime(Number(expTime))
          }
          // if((httpEvent as HttpResponse<any>).headers.has('mintargetapiversion')) {
          //   minTargetApiVersion = httpEvent.headers.get('mintargetapiversion');
          // }
        }
        return httpEvent
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error)
        this.messageService.displayError('BEE', error, error.url as string)
        return throwError(error);
      })
    );

    // next.handle(request).pipe(map((res: Response) => console.log(res.headers.values())));
    // return next.handle(request)
    // return next.handle(request).pipe(
    //   map(((event:HttpEvent<any>) => {
    //     return event
    //   })),
    //
    // )
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
