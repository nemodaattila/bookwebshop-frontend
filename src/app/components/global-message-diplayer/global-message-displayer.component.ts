import {Component, OnInit} from '@angular/core';
import {GlobalMessageDisplayerService} from "../../services/helper/global-message-displayer.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-global-message-diplayer',
  templateUrl: './global-message-displayer.component.html',
  styleUrls: ['./global-message-displayer.component.css']
})
export class GlobalMessageDisplayerComponent implements OnInit {

  constructor(private messageService: GlobalMessageDisplayerService) {

  }

  public hasMessage: boolean = false;

  public success: boolean = false;

  public message: string = '';

  private messageSubs = Subscription.EMPTY;

  private timeOut: any

  ngOnInit(): void {
    // this.resetMessage()
    console.log('initdips')
    console.log(this.messageService)
    this.messageSubs = this.messageService.messageEmitter.subscribe(value => {
      clearTimeout(this.timeOut)
      console.log('message')
      console.log(value)
      this.hasMessage = true;
      this.success = value[0];
      this.message = value[1];
      this.startTimeOut()
    })
  }

  startTimeOut() {
    this.timeOut = setTimeout(() => {
      this.resetMessage()
    }, 10000);
  }

  resetMessage() {
    this.hasMessage = false;
    this.success = false;
    this.message = '';
  }

}
