import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LoggedUserService} from "./logged-user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationNotLoggedGuard implements CanActivate {

  constructor(private loggedUserServ: LoggedUserService, private router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loggedUserServ.getLoggedUserState()) {
      void this.router.navigateByUrl('');
      return false
    }
    return true;
  }

}
