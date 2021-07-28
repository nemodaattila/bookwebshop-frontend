import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/authentication/user.service";
import {User} from "../../../models/user/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-logged-in-menu',
  templateUrl: './logged-in-menu.component.html',
  styleUrls: ['./logged-in-menu.component.css']
})
export class LoggedInMenuComponent implements OnInit {

  constructor(private authService: UserService) {
  }

  loggedUser!: User;

  ngOnInit(): void {
    this.loggedUser = <User>this.authService.getLoggedUser();
  }

  logOut() {
    this.authService.logOut()
  }

}
