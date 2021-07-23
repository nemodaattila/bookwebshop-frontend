import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class HttpAuthenticationInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const auth = this.injector.get(AuthenticationService);
    console.log(auth.getToken())
    let r2 = request.clone({
      withCredentials: true
    })
    if (auth.getToken() !== null) {
      const authRequest = r2.clone({

        headers: r2.headers.set('Authorization', auth.getToken() as string),

        // headers: request.headers.set('Content-Type', 'text/plain')

        //  'Content-Type': 'text/plain',
      });

      console.log(authRequest)

      return next.handle(authRequest);
    }
    console.log(r2)
    return next.handle(r2);

  }
}
