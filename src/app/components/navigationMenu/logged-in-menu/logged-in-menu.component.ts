import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {User} from "../../../models/user/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-logged-in-menu',
  templateUrl: './logged-in-menu.component.html',
  styleUrls: ['./logged-in-menu.component.css']
})
export class LoggedInMenuComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  loggedUser!: User;

  errorMessage: string = '';

  eventSubscription = Subscription.EMPTY;

  ngOnInit(): void {

    this.loggedUser = <User>this.authService.getLoggedUser();
    this.eventSubscription = this.authService.eventListener.subscribe(value => {
      if (value.type === 'logOutError') {
        this.errorMessage = value.value;
      }
    });
  }

  logOut()
  {
    this.authService.logOut()
  }


}
