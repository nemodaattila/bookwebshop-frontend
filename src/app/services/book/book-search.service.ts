import {BookSearchModel} from "../../models/service/book-search-model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {backendUrl} from "../../globals";
import {GlobalMessageDisplayerService} from "../helper/global-message-displayer.service";

@Injectable({
  providedIn: 'root'
})
/**
 * creates and sends a request to the server for searching books in database
 * based on multiple search parameter
 */
export class BookSearchService {

  /**
   * pushes the actual isbn list
   */
  public isbnListArrived = new Subject<any>();

  /**
   * asks registered components for search parameters
   */
  public searchParamRequestSubject = new Subject<null>();

  public localOrderingRequest = new Subject<[string, string]>();

  /**
   * search parameters in object model form
   * @private
   */
  private searchParams: BookSearchModel

  /**
   * count of registered components as parameter source
   * @private
   */
  private registeredSourceComponentCount: number = 0;

  private registeredSourceComponents: Array<string> = []

  /**
   * count of registered components that answered after a parameter call
   * @private
   */
  private answeredRegisteredComponentCount: number = 0;

  /**
   * parameters are to be reset or not
   * @private
   */
  private setToDefault: boolean = true

  constructor(private http: HttpClient, private messageService: GlobalMessageDisplayerService) {
    this.searchParams = new BookSearchModel()
  }

  /**
   * register a new parameter source component
   * simple increases to counter
   */

  registerSearchSourceService(type: string) {
    if (this.registeredSourceComponents.indexOf(type) === -1) {
      this.registeredSourceComponents.push(type)
      this.registeredSourceComponentCount++;
    }
  }

  unRegisterSearchService(type: string) {
    let index = this.registeredSourceComponents.indexOf(type)
    if (index !== -1) {
      this.registeredSourceComponents.splice(index, 1);
      this.registeredSourceComponentCount--;
    }
  }

  /**
   * saves Category criteria, deletes criteria if needed
   * checks source is registered
   * @param source code string of source
   * @param type type of criteria
   * @param value value of criteria
   */
  setCategorySearchCriteria(source: string, type: string | null, value: number | null) {
    if (this.registeredSourceComponents.indexOf(source) !== -1) {
      if (type === 'MainCategory') {
        this.searchParams.delCriteria('Category')
      }
      if (type === 'Category') {
        this.searchParams.delCriteria('MainCategory')
      }
      if (type === null) {
        this.searchParams.delCriteria('Category')
        this.searchParams.delCriteria('MainCategory')
      } else
        this.searchParams.setCriteria(type, value as number)
      this.increaseAnswered()
    }
  };

  /**
   * sets search parameters
   * checks source is registered
   * @param source code string of source
   * @param params search parameters
   */
  setSearchCriteria(source: string, params: { [index: string]: any }) {
    if (this.registeredSourceComponents.indexOf(source) !== -1) {
      for (let key in params) {
        if (typeof params[key] === 'object') {
          this.searchParams.setCriteria(key, {...params[key]})
        } else
          this.searchParams.setCriteria(key, params[key])
      }
      this.increaseAnswered()
    }
  }

  /**
   * sets the offset parameter of the search model
   * check source is registered
   * @param source code string of source
   * @param offset offset value
   */
  public setOffsetCriteria(source: string, offset: number) {
    if (this.registeredSourceComponents.indexOf(source) !== -1) {
      this.searchParams.setOffset(offset)
      this.increaseAnswered()
    }
  }

  /**
   * init search process
   * send search parameter collecting signal
   * @param setDefault
   */
  public initSearch(setDefault: boolean = true) {
    this.searchParams.setPrevCriteria()
    if (setDefault) this.searchParams.setDefault();
    this.answeredRegisteredComponentCount = 0;
    this.setToDefault = setDefault;
    this.searchParamRequestSubject.next(null);
  }

  /**
   * resets the search params to default
   */
  public setDefault() {
    this.searchParams.setDefault()
  }

  /**
   * if the number answered calls equals the registered component's number, calls
   * request creator function
   */
  checkRegisterSourceCount() {
    if (this.registeredSourceComponentCount === this.answeredRegisteredComponentCount) {
      this.createAndSendRequest()
    }
  }

  /**
   * returns the set number of result per page
   */
  getQuantityPerPage() {
    return this.searchParams.getLimit()
  }

  /**
   * sets the property of order, order dir and search limit in the model
   * checks if parameter source is registered
   * @param source code string of source
   * @param order order attribute
   * @param orderDir directory of order
   * @param limit number of results to be displayed
   */
  setOrderAndLimit(source: string, order: string, orderDir: string, limit: number) {
    if (this.registeredSourceComponents.indexOf(source) !== -1) {
      this.searchParams.setOrderAndLimit(order, orderDir, limit);
      this.increaseAnswered()
    }
  }

  /**
   * increases the counter for components that registered as source, when they answered for
   * parameter call
   * @private
   */
  private increaseAnswered() {
    this.answeredRegisteredComponentCount++;
    this.checkRegisterSourceCount()
  }

  /**
   * creates and calls http request, based on search parameters, for book search
   * on response it passes the isbn list through a Subject
   * in case of ordering or result count change, checks if the ordering is possible
   * without request call
   * @private
   */
  private createAndSendRequest() {
    this.searchParams.setNewCriteria();
    let isLocal = this.localOrderChecker();
    let params = this.searchParams.getSearchParams();
    console.log(params)
    console.log(isLocal)
    if (!isLocal) {
      this.searchForBooks(params).subscribe(({'success': success, 'data': data}) => {
        console.log(data)
        if (success) {
          this.isbnListArrived.next({'success': success, 'data': data})
          this.searchParams.setLastSearchAllResultCount(data.count)
        } else
          this.messageService.displayFail('BLG', data['errorCode'])
      })
    } else {
      this.localOrderingRequest.next([params.order, params.orderDir])
    }
  }

  /**
   * http request for book search
   * @param searchParams
   * @private
   */
  private searchForBooks(searchParams: object): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain',
    });
    return this.http.post<any>(backendUrl + '\\booklist', searchParams, {headers: headers});
  }

  /**
   * checks if displaying new data can be possible without http request
   * @private
   */
  private localOrderChecker() {
    if (this.searchParams.getOrder() === 'Year') return false;
    let prevCriteria = this.searchParams.getPrevCriteria();
    let newCriteria = this.searchParams.getNewCriteria();
    let count = this.searchParams.getLastSearchAllResultCount()

    if (prevCriteria[0] === newCriteria[0]) {
      if ((count <= 10) || (count <= prevCriteria[1]) && (prevCriteria[1] <= newCriteria[1]) && (count <= newCriteria[1])) {
        return true
      }
    }
    return false;
  }
}
