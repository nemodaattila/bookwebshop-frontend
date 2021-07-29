import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Subject} from "rxjs";
import {MessageCodes} from "../../models/service/message-codes";

@Injectable({
  providedIn: 'root'
})
export class GlobalMessageDisplayerService {

  private messageCodes: MessageCodes = new MessageCodes();

  constructor() {
    console.log('glconst')
  }

  messageEmitter = new Subject<[boolean, string]>()

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
    console.log(message)
    this.messageEmitter.next([false, message])
  }

  displayError(frontendCode: string, error: HttpErrorResponse, optionalData?: string) {
    let frontendMessage = this.messageCodes.getFrontendErrorMessage(frontendCode)
    let message = ((frontendMessage === undefined) ? frontendCode : frontendMessage) + ' - ';
    message += error.error.text ?? error.error.message ?? error.message ?? error.error ?? 'UNKNOWN ERROR'
    message += (optionalData === undefined) ? '' : ' - ' + optionalData
    this.messageEmitter.next([false, message])
  }

  displaySuccess(frontendCode: string, optionalData?: string) {
    let frontendMessage = this.messageCodes.getFrontendSuccessMessage(frontendCode)
    let message = ((frontendMessage === undefined) ? frontendCode : frontendMessage);
    message += (optionalData === undefined) ? '' : ' - ' + optionalData
    this.messageEmitter.next([true, message])
  }
}
