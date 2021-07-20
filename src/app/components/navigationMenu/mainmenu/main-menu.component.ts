import {Component, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../../services/user/authentication.service";

@Component({
  selector: 'app-mainmenu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService) {}

  private loggedUSerSubscription = Subscription.EMPTY

  ngOnInit(): void {
    this.authService.loggedUserState.subscribe((value => {
      this.hasLoggedUser = value
    }))
  }

  public inputValue = '';

  public hasLoggedUser: boolean = false;



  quickSearch()
  {
    if (this.inputValue.length > 2 )
      this.router.navigate(['browse',this.inputValue])
    this.inputValue = ''
  }
}
