
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

  constructor(private http: HttpClient) {
    super();
    this.searchParams = new BookSearchModel()

    this.initSearch()
  }

  public initSearch(setDefault: boolean = true) {
    this.searchParams.setPrevCrit()
    if (setDefault) this.searchParams.setDefault();
    // this.collectCriteriums();
    this.searchParams.setNewCrit();
    let isLocal = this.localOrderChecker();
    let params = this.searchParams.getSearchParams();
    if (isLocal === false) {
      this.searchForBooks(params).subscribe(bookList=>{
        console.log (typeof bookList)
        console.log (isObject(bookList))
        console.log (bookList.data)
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
    console.log(searchParams)
    return this.http.post<any>(this._backendUrl + '\\booklist', searchParams ,{headers: headers});
  }

  //DO create
  private localOrderChecker() {
    return false
  }
}
