import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "./user.service";
import {LoggedUserService} from "./logged-user.service";

@Injectable({
  providedIn: 'root'
})
export class DataMaintainerGuard implements CanActivate {

  constructor(private userServ: UserService, private loggedUserServ: LoggedUserService, private router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loggedUserServ.getLoggedUserChecked()) {
      const lu = this.loggedUserServ.getLoggedUserState()
      if (lu) {
        return true
      } else {
        void this.router.navigateByUrl('');
        return false
      }
    }
    return this.getUserState().then(value => {
      if (value) {
        return true
      } else {
        void this.router.navigateByUrl('');
        return false
      }
    });
  }

  async getUserState(): Promise<boolean> {

    return new Promise((resolve, reject) => {

      this.userServ.loggedUserState.subscribe(
        response => {
          resolve(response)
        }, error => {
          reject(error);
        }
      );

    })

  }

}
