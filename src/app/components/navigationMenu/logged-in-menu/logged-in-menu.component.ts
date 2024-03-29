import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../services/authentication/user.service";
import {User} from "../../../models/user/user";

@Component({
  selector: 'app-logged-in-menu',
  templateUrl: './logged-in-menu.component.html',
  styleUrls: ['./logged-in-menu.component.css']
})
export class LoggedInMenuComponent implements OnInit, OnDestroy {

  loggedUser!: User;
  tokenExpirationTime: number = 600
  tokenExpirationString: string = '';
  timer: any

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.loggedUser = <User>this.userService.getLoggedUser();
    this.tokenExpirationTime = this.userService.getTokenExpirationTime()
    this.startInterval()
  }

  setExpirationString() {
    this.tokenExpirationString = '(' + Math.floor(this.tokenExpirationTime / 60) + ':' + (this.tokenExpirationTime % 60) + ')'
  }

  startInterval() {
    this.timer = setInterval(() => {
      this.setExpirationString()
      this.tokenExpirationTime--;
      if (this.tokenExpirationTime < 0) {
        clearTimeout(this.timer)
        this.logOut()
      }
    }, 1000);
  }

  logOut() {
    this.userService.logOut()
  }

  ngOnDestroy(): void {
    clearInterval(this.timer)
  }

}
