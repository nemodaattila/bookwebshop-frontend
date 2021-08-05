import {Injectable} from '@angular/core';
import {backendUrl} from "../../globals";
import {HttpClient} from "@angular/common/http";
import {GlobalMessageDisplayerService} from "../helper/global-message-displayer.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
/**
 * service for filling data lists with options (complexSearch)
 */
export class BookCriteriaDataListFillerService {

  constructor(private http: HttpClient, private messageService: GlobalMessageDisplayerService) {
  }

  /**
   * emits result
   */
  dataListEmitter = new Subject()

  /**
   * sends request to server for datalist options
   * @param type type/theme of datalist
   * @param pattern pattern to search with
   */
  public getDataList(type: string, pattern: string): any {
    this.http.get<any>(backendUrl + '\\datalist\\' + type + '\\' + pattern).subscribe(({
                                                                                         'success': success,
                                                                                         'data': data
                                                                                       }) => {
      if (success) {
        this.dataListEmitter.next(data)
      } else
        this.messageService.displayFail('BDL', data['errorCode'])
    });
  }
}
