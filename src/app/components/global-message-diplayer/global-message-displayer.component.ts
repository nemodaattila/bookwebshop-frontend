import {Component, OnInit} from '@angular/core';
import {GlobalMessageDisplayerService} from "../../services/helper/global-message-displayer.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-global-message-displayer',
  templateUrl: './global-message-displayer.component.html',
  styleUrls: ['./global-message-displayer.component.css']
})

/**
 * displays message on method fail/success i.e. httpResponse error, validation error
 * disappears after 10 seconds
 */
export class GlobalMessageDisplayerComponent implements OnInit {

  /**
   * there is a message to be displayed
   */
  public hasMessage: boolean = false;
  /**
   * true if method finished successfully (green background) or failed (red background)
   */
  public success: boolean = false;
  /**
   * message to be displayed
   */
  public message: string = '';
  /**
   * subscription to GlobalMessageDisplayerService, listens for messages
   * @private
   */
  private messageSubs = Subscription.EMPTY;
  /**
   * timeout for deleting message
   * @private
   */
  private timeOut: any

  constructor(private messageService: GlobalMessageDisplayerService) {
  }

  ngOnInit(): void {
    this.messageSubs = this.messageService.messageEmitter.subscribe(value => {
      clearTimeout(this.timeOut)
      this.hasMessage = true;
      this.success = value[0];
      this.message = value[1];
      this.startTimeOut()
    })
  }

  /**
   * starts timer
   */
  startTimeOut() {
    this.timeOut = setTimeout(() => {
      this.resetMessage()
    }, 10000);
  }

  /**
   * reset parameters to default
   */
  resetMessage() {
    this.hasMessage = false;
    this.success = false;
    this.message = '';
  }
}
