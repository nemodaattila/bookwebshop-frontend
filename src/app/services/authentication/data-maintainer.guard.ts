import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from "./user.service";
import {LoggedUserService} from "./logged-user.service";

@Injectable({
  providedIn: 'root'
})
export class DataMaintainerGuard implements CanActivate {

  constructor(private userServ: UserService, private loggedUserServ: LoggedUserService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('DMG')
    const ch = this.loggedUserServ.getLoggedUserChecked()
    if (this.loggedUserServ.getLoggedUserChecked()) {
      const lu = this.loggedUserServ.getLoggedUserState()
      if (lu) {
        return true
      } else {
        this.router.navigateByUrl('');
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
          console.log(response)
          resolve(response)
        }, error => {
          // this.errorMessage = <any>error;
          // if(this.errorMessage != null){
          reject(error);
          // }
        }
      );

    })

  }

}
