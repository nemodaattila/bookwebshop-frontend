import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Subject} from "rxjs";
import {MessageCodes} from "../../models/service/message-codes";

@Injectable({
  providedIn: 'root'
})

/**
 * service for displaying event messages (http event mostly ), works with GlobalMessageDisplayerComponent
 * , searches for messages in MessageCodes class, based on frontendCode, backendCode
 */
export class GlobalMessageDisplayerService {

  /**
   * model class which contains error messages
   * @private
   */
  private messageCodes: MessageCodes = new MessageCodes();

  constructor() {
  }

  /**
   * emits message [success/fail, message]
   */
  messageEmitter = new Subject<[boolean, string]>()

  /**
   * displays messages after request fail (http response is 200 but the requested, operation failed,
   * e.g.: wrong password on login)
   * @param frontendCode code of the frontend operation
   * @param backendCode errorCode of the backend operation
   * @param optionalData optional data to be displayed
   */
  displayFail(frontendCode: string, backendCode?: string, optionalData?: string) {
    let frontendMessage = this.messageCodes.getFrontendErrorMessage(frontendCode)
    let message = ((frontendMessage === undefined) ? frontendCode : frontendMessage) + ' - ';
    if (backendCode === undefined) {
      message += "UNKNOWN ERROR"
    } else {
      let backendMessage = this.messageCodes.getBackendErrorMessage(backendCode)
      message += ((backendMessage === undefined) ? backendCode : backendMessage);
    }
    message += (optionalData === undefined) ? '' : ' - ' + optionalData
    this.messageEmitter.next([false, message])
  }

  /**
   * displays error after request error (HttpErrorResponse) i.e: “500 Internal Server Error”
   * @param frontendCode code of frontend operation
   * @param error HttpErrorResponse object
   * @param optionalData optional data to be displayed
   */
  displayError(frontendCode: string, error: HttpErrorResponse, optionalData?: string) {
    let frontendMessage = this.messageCodes.getFrontendErrorMessage(frontendCode)
    let message = ((frontendMessage === undefined) ? frontendCode : frontendMessage) + ' - ';
    message += error.error.text ?? error.error.message ?? error.message ?? error.error ?? 'UNKNOWN ERROR'
    message += (optionalData === undefined) ? '' : ' - ' + optionalData
    this.messageEmitter.next([false, message])
  }

  /**
   * displys data on successful operation , i.e: succesful login
   * @param frontendCode code of the frontend operation
   * @param optionalData optional data to be displayed
   */
  displaySuccess(frontendCode: string, optionalData?: string) {
    let frontendMessage = this.messageCodes.getFrontendSuccessMessage(frontendCode)
    let message = ((frontendMessage === undefined) ? frontendCode : frontendMessage);
    message += (optionalData === undefined) ? '' : ' - ' + optionalData
    this.messageEmitter.next([true, message])
  }
}
