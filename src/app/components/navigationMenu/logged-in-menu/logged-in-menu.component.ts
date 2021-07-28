import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../services/authentication/user.service";
import {User} from "../../../models/user/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-logged-in-menu',
  templateUrl: './logged-in-menu.component.html',
  styleUrls: ['./logged-in-menu.component.css']
})
export class LoggedInMenuComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService) {
  }

  loggedUser!: User;
  tokenExpirationTime: number = 600

  tokenExpirationString: string = '';

  timer: any

  ngOnInit(): void {
    this.loggedUser = <User>this.userService.getLoggedUser();
    this.tokenExpirationTime = this.userService.getTokenExpirationTime()
    console.log(this.tokenExpirationTime)
    this.startInterval()
  }

  setExpirationString() {
    this.tokenExpirationString = '(' + Math.floor(this.tokenExpirationTime / 60) + ':' + (this.tokenExpirationTime % 60) + ')'
  }

  startInterval() {
    this.timer = setInterval(() => {
      this.setExpirationString()
      this.tokenExpirationTime--;
      if (this.tokenExpirationTime === 0) {
        clearTimeout(this.timer)
        console.log('timout')
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
