import {Injectable} from '@angular/core';
import {backendUrl} from "../../globals";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GlobalMessageDisplayerService} from "../helper/global-message-displayer.service";

@Injectable({
  providedIn: 'root'
})
export class BookQuickDataAdderService {

  constructor(private http: HttpClient, private messageService: GlobalMessageDisplayerService) {
  }

  public addNewData(type: number, value: string): any {
    const data = {
      type: type,
      data: value
    }
    console.log(data)
    this.http.post<any>(backendUrl + 'addQuickData', data,
      {headers: new HttpHeaders({'Content-Type': 'text/plain',})}).subscribe(({
                                                                                'success': success,
                                                                                'data': data
                                                                              }) => {
      if (!success) {
        this.messageService.displayFail('BQDA', data['errorCode'])
      } else {
        this.messageService.displaySuccess('BQDA', value)
      }
    });
  }

}
