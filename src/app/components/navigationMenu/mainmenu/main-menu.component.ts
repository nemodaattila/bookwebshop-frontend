import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../../services/authentication/authentication.service";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
/**
 * component displaying a navigation menu
 * TODO global message displayer
 */
export class MainMenuComponent implements OnInit {

  public inputValue = '';

  public hasLoggedUser: boolean = false;

  constructor(private router: Router, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authService.loggedUserState.subscribe((value => {
      this.hasLoggedUser = value
    }))
  }

  quickSearch() {
    if (this.inputValue.length > 2)
      this.router.navigate(['browse', this.inputValue])
    this.inputValue = ''
  }
}
