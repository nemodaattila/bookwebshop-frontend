import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LoggedUserService} from "./logged-user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationNotLoggedGuard implements CanActivate {

  constructor(private loggedUserServ: LoggedUserService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !this.loggedUserServ.getLoggedUserState();
  }

}
