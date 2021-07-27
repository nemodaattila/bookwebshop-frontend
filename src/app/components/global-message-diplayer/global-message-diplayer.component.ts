import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-global-message-diplayer',
  templateUrl: './global-message-diplayer.component.html',
  styleUrls: ['./global-message-diplayer.component.css']
})
export class GlobalMessageDiplayerComponent implements OnInit {

  constructor() {
  }

  public hasMessage: boolean = false;

  public message: string = 'dsfgfdgf';

  ngOnInit(): void {
  }

}
