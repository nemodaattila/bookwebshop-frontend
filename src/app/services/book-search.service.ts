
import {ServiceParentService} from "./service-parent.service";
import {BookSearchModel} from "../models/book-search-model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {isObject} from "rxjs/internal-compatibility";

@Injectable({
  providedIn: 'root'
})
export class BookSearchService extends ServiceParentService {

  private searchParams : BookSearchModel
  public isbnListArrived = new Subject<any>();
  public searchParamRequestSubject = new Subject<null>();

  private registeredServices: number = 0;

  private answeredRegisteredServices: number = 0;
  private setToDefault: boolean = true

  constructor(private http: HttpClient) {
    super();
    this.searchParams = new BookSearchModel()
    this.createAndSendRequest()
  }

  registerSearchSourceService()
  {
    this.registeredServices ++;
    console.log(this.registeredServices)
  }

  setSearchCriterium(type: string |null, value: number | null) {
   console.log(type, value)
    if (type === 'MainCategory')
    {
      this.searchParams.delCrit('Category')
    }
    if (type === 'Category')
    {
      this.searchParams.delCrit('MainCategory')
    }
    if (type === null)
    {
      this.searchParams.delCrit('Category')
      this.searchParams.delCrit('MainCategory')
    }
    else
      this.searchParams.setCrit(type, value as number)
    this.increaseAnswered()
  };

  public setOffsetCrit(offset: number)
  {
    console.log(offset)
    this.searchParams.setOffset(offset)
    this.increaseAnswered()
  }

  private increaseAnswered()
  {
    this.answeredRegisteredServices++;
    this.checkRegisterSourceCount()
  }

  public initSearch(setDefault: boolean = true) {
    this.searchParams.setPrevCrit()
    if (setDefault) this.searchParams.setDefault();
      this.answeredRegisteredServices = 0;
      this.setToDefault = setDefault;
      this.searchParamRequestSubject.next(null);
  }

  checkRegisterSourceCount()
  {
    console.log([this.registeredServices, this.answeredRegisteredServices])
    if (this.registeredServices === this.answeredRegisteredServices)
      this.createAndSendRequest()
  }

  private createAndSendRequest() {


    // this.collectCriteriums();
    this.searchParams.setNewCrit();
    let isLocal = this.localOrderChecker();
    let params = this.searchParams.getSearchParams();
    if (isLocal === false) {

      this.searchForBooks(params).subscribe(bookList=>{
        console.log(bookList)
        this.isbnListArrived.next(bookList)
      }, error => {
        console.log(error)
        console.dir(error.error.text ??  error.error)
      })
      // let ac = new AjaxCaller()
      // ac.targetUrl = JSCore.getRoot() + "/book/withParameter/";
      // ac.requestType = 'POST';
      // ac.addCustomHeader('Content-Type', 'application/json')
      // ac.postFields = params;
      // ac._subscriptionCallWord = "getBooks";
      // ac.send();
    } else {
      //DO
      // if (ContentHandler !== undefined)
      //   ContentHandler.offlineOrderer(params.order, params.orderDir)
    }
  }

  /**
   *
   * @param searchParams
   * @private
   * @DO check phpstorm angularjs + wampserver apache - cors problem with content-type : application/JSON
   */
  private searchForBooks(searchParams: object):Observable<any>
  {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain',
    });
    // console.log(searchParams)
    return this.http.post<any>(this._backendUrl + '\\booklist', searchParams ,{headers: headers});
  }

  getQuantityPerPage() {
    return this.searchParams.getLimit()
  }

  setOrderAndLimit(order: string, orderDir: string, limit:number)
  {
    this.searchParams.setOrderAndLimit(order,orderDir,limit);
    this.increaseAnswered()
  }

  //DO create
  private localOrderChecker() {
    return false
  }
}
