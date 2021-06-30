import {ServiceParentService} from "./service-parent.service";
import {BookSearchModel} from "../models/book-search-model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
/**
 * creates and sends a request to the server for searching books in database
 * based on multiple search parameter
 */
export class BookSearchService extends ServiceParentService {

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
  private registeredSourceComponents: number = 0;

  /**
   * count of registered components that answered after a parameter call
   * @private
   */
  private answeredRegisteredComponents: number = 0;

  /**
   * parameters are o be reseted or not
   * @private
   */
  private setToDefault: boolean = true

  constructor(private http: HttpClient) {
    super();
    this.searchParams = new BookSearchModel()
    this.createAndSendRequest()
  }

  /**
   * register a new parameter source component
   * simple increases to counter
   */
  registerSearchSourceService() {
    this.registeredSourceComponents++;
  }

  /**
   * saves source criteria, deletes criteria if needed
   * @param type type of criteria
   * @param value value of criteria
   */
  setSearchCriteria(type: string | null, value: number | null) {
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
  };

  /**
   * sets the offset parameter of the search model
   * @param offset
   */
  public setOffsetCriteria(offset: number) {
    this.searchParams.setOffset(offset)
    this.increaseAnswered()
  }

  /**
   * increases the counter for components that registered as source, when they answered for
   * parameter call
   * @private
   */
  private increaseAnswered() {
    this.answeredRegisteredComponents++;
    this.checkRegisterSourceCount()
  }

  public initSearch(setDefault: boolean = true) {
    this.searchParams.setPrevCriteria()
    if (setDefault) this.searchParams.setDefault();
    this.answeredRegisteredComponents = 0;
    this.setToDefault = setDefault;
    this.searchParamRequestSubject.next(null);
  }

  /**
   * if the number answered calls equals the registered component's number, calls
   * request creator function
   */
  checkRegisterSourceCount() {
    if (this.registeredSourceComponents === this.answeredRegisteredComponents)
      this.createAndSendRequest()
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
    if (!isLocal) {
      this.searchForBooks(params).subscribe(bookList => {
        this.isbnListArrived.next(bookList)
        this.searchParams.setLastSearchAllResultCount(bookList.data.count)
      }, error => {
        console.dir(error.error.text ?? error.error)
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
    return this.http.post<any>(this._backendUrl + '\\booklist', searchParams, {headers: headers});
  }

  /**
   * returns the set number of result per page
   */
  getQuantityPerPage() {
    return this.searchParams.getLimit()
  }

  /**
   * sets the property of order, order dir and search limit in the model
   * @param order order attribute
   * @param orderDir directory of order
   * @param limit number of results to be displayed
   */
  setOrderAndLimit(order: string, orderDir: string, limit: number) {
    this.searchParams.setOrderAndLimit(order, orderDir, limit);
    this.increaseAnswered()
  }

  /**
   * checks if displaying new data can be possible without http request
   * @private
   */
  private localOrderChecker() {
    if (this.searchParams.getOrder()==="Year") return false;
    let prevCriteria=this.searchParams.getPrevCriteria();
    let newCriteria=this.searchParams.getNewCriteria();
    let count=this.searchParams.getLastSearchAllResultCount()
    if (prevCriteria[0]===newCriteria[0]) {
      if ((count <= 10) || (count <= prevCriteria[1]) && (prevCriteria[1] <= newCriteria[1]) && (count<=newCriteria[1]))
      {
        return true
      }
    }
    return false;
  }
}
