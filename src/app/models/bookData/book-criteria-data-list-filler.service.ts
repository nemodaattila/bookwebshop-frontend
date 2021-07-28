import {Injectable} from '@angular/core';
import {backendUrl} from "../../globals";
import {HttpClient} from "@angular/common/http";
import {GlobalMessageDisplayerService} from "../../services/helper/global-message-displayer.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookCriteriaDataListFillerService {

  constructor(private http: HttpClient, private messageService: GlobalMessageDisplayerService) {
  }

  dataListEmitter = new Subject()

  public getDataList(type: string, pattern: string): any {
    this.http.get<any>(backendUrl + '\\datalist\\' + type + "\\" + pattern).subscribe(({
                                                                                         'success': success,
                                                                                         'data': data
                                                                                       }) => {
      if (success) {
        this.dataListEmitter.next(data)
      } else
        this.messageService.displayFail('BDL', data['errorCode'])
    }, error => {
      this.messageService.displayError('BDL', error);
      return;
    });
  }
}
