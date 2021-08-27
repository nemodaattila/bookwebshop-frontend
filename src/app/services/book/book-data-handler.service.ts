import {Injectable} from '@angular/core';
import {backendUrl} from "../../globals";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GlobalMessageDisplayerService} from "../helper/global-message-displayer.service";
import {LocalLibraryService} from "./local-library.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class BookDataHandlerService {

  constructor(private http: HttpClient, private messageService: GlobalMessageDisplayerService,
              private localLibrary: LocalLibraryService, private router: Router) {
  }

  public addNewData(type: number, value: string): any {
    const data = {
      type: type,
      data: value
    }
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

  public addNewBook(data: { [index: string]: any }) {
    this.http.post<any>(backendUrl + 'uploadbook', data).subscribe(({
                                                                      'success': success,
                                                                      'data': newData
                                                                    }) => {
      if (!success) {
        this.messageService.displayFail('BUR', newData['errorCode'])
      } else {
        this.messageService.displaySuccess('BUR', data.title)
      }
    });
  }

  public modifyBook(data: { [index: string]: any }) {
    console.log('modify')
    this.http.put<any>(backendUrl + 'modifybook', data).subscribe(({
                                                                     'success': success,
                                                                     'data': newData
                                                                   }) => {
      if (!success) {
        this.messageService.displayFail('BMR', newData['errorCode'])
      } else {
        this.messageService.displaySuccess('BMR', data.originalIsbn)
        this.localLibrary.removeABook(newData.isbn)
        this.localLibrary.checkIsbnInLocalLibrary(newData.isbn)

        this.localLibrary.libraryRefreshed.subscribe(() => {
          void this.router.navigate(['bookalldata', newData.isbn])
        })
      }
    });
  }

}
