import {Injectable} from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";
import {BookSearchService} from "./book-search.service";
import {LocalLibraryModel} from "../../models/service/local-library-model";
import {HttpClient} from "@angular/common/http";
import {BookPrimaryData} from "../../models/bookData/book-primary-data";
import {backendUrl} from "../../globals";
import {GlobalMessageDisplayerService} from "../helper/global-message-displayer.service";

@Injectable({
  providedIn: 'root'
})
/**
 * stores the data of all already loaded books
 */
export class LocalLibraryService {

  /**
   * gets the isbn list from BookSearchService
   */
  isbnListSubscription: object = Subscription.EMPTY;

  /**
   * indicates that tha library is refreshed according to the new isbn list
   */
  public libraryRefreshed = new Subject<null>();

  /**
   * model for storing book data
   */
  localLibrary: LocalLibraryModel;

  /**
   * indicates that the localLibrary is ready to query
   * @private
   */
  private readyState: boolean = false;

  /**
   * subscribes to BookSearchService for book search result isbn list
   * @param bookSearch
   * @param http
   * @param messageService
   */
  constructor(private bookSearch: BookSearchService, private http: HttpClient, private messageService: GlobalMessageDisplayerService) {
    this.localLibrary = new LocalLibraryModel();
    this.fillBooksFromLocalStorage();
    this.isbnListSubscription = <object>this.bookSearch.isbnListArrived.subscribe(({data: isbnList}) => {
      this.checkListInLocalLibrary(isbnList.list)
    })
  }

  /**
   * return readiness value
   */
  public checkReadyState() {
    return this.readyState;
  }

  /**
   * loads local library from LocalStorage
   * if it's not null send it to save in model
   */
  fillBooksFromLocalStorage() {
    let localLibrary = localStorage.getItem('localLibrary');
    // localLibrary = null
    if (localLibrary !== null) {
      this.localLibrary.fillFromLocalStorage(localLibrary)
      this.saveLocalLibraryToLocalStorage();
    }
  }

  /**
   * iterates the isbn numbers for checking in local library
   * @param isbnList
   */
  checkListInLocalLibrary(isbnList: Array<string>) {
    isbnList.map((isbn: string) => {
      this.checkIsbnInLocalLibrary(isbn)
    })
  }

  /**
   * checks the isbn if it exists in LocalLibrary model
   * if not it send a call for server for it
   * @param isbn book isbn to be checked if exists
   * @private
   */
  private checkIsbnInLocalLibrary(isbn: string) {
    if (!this.localLibrary.checkBookInLibrary(isbn)) {
      this.getBookPrimaryData(isbn).subscribe(({'success': success, 'data': data}) => {
        if (success) {
          this.localLibrary.addBookPrimaryData(isbn, data)
          this.saveLocalLibraryToLocalStorage();
        } else {
          this.messageService.displayFail('BPD', data['errorCode'])
        }
      })
    }
  }

  /**
   * http request for book primary data
   * @param isbn
   * @private
   */
  private getBookPrimaryData(isbn: string): Observable<{ success: boolean, data: any }> {
    return this.http.get<{ success: any, data: object }>(backendUrl + "\\primaryData\\" + isbn);
  }

  /**
   * saves to LocalLibrary model to LocalStorage
   * @private
   */
  private saveLocalLibraryToLocalStorage() {
    localStorage.setItem('localLibrary', JSON.stringify(this.localLibrary))
    this.readyState = true;
    this.libraryRefreshed.next()
  }

  /**
   * returns the data of primary data of a book
   * if it not exists return an default Data object with default data
   * @param isbn isbn of the book
   */
  public getPrimaryData(isbn: string): BookPrimaryData {
    if (!this.localLibrary.checkBookInLibrary(isbn)) return new BookPrimaryData([])
    return this.localLibrary.getPrimaryData(isbn)
  }
}
