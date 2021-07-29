import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../services/authentication/user.service";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
/**
 * component displaying a navigation menu
 */
export class MainMenuComponent implements OnInit {

  /**
   * value linked to the quickSearch input element
   */
  public inputValue = '';

  /**
   * boolean flag for displaying login menu OR logged user menu
   */
  public hasLoggedUser: boolean = false;

  constructor(private router: Router, private authService: UserService) {
  }

  /**
   * subscription for change in logged user state
   */
  ngOnInit(): void {
    this.authService.loggedUserState.subscribe((value => {
      this.hasLoggedUser = value
    }))
  }

  /**
   * onclick event for quickSearch search button (egyszerű keresés)
   */
  quickSearch() {
    if (this.inputValue.length > 2)
      void this.router.navigate(['browse', this.inputValue])
    this.inputValue = ''
  }
}
