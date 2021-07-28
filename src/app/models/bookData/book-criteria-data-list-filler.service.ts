import {Injectable} from '@angular/core';
import {backendUrl} from "../../globals";
import {HttpClient} from "@angular/common/http";
import {GlobalMessageDisplayerService} from "../../services/helper/global-message-displayer.service";

@Injectable({
  providedIn: 'root'
})
export class BookCriteriaDataListFillerService {

  constructor(private http: HttpClient, private messageService: GlobalMessageDisplayerService) {
  }

  public getDataList(type: string, pattern: string): any {
    this.http.get<any>(backendUrl + '\\datalist\\' + type + "\\" + pattern).subscribe(({
                                                                                         'success': success,
                                                                                         'data': data
                                                                                       }) => {
      if (success) {
        return data
      } else
        this.messageService.displayFail('BDL', data['errorCode'])
    }, error => {
      this.messageService.displayError('BDL', error);
      return;
    });
  }
}
