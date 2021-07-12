import {Component, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-mainmenu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public inputValue = '';



  quickSearch()
  {
    if (this.inputValue.length > 2 )
      this.router.navigate(['browse',this.inputValue])
    this.inputValue = ''
  }
}
