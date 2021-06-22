import {Injectable} from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";
import {BookSearchService} from "./book-search.service";
import {LocalLibraryModel} from "../models/local-library-model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ServiceParentService} from "./service-parent.service";
import {isObject} from "rxjs/internal-compatibility";
import {BookData} from "../models/book-data";
import {BookPrimaryData} from "../models/book-primary-data";

@Injectable({
  providedIn: 'root'
})
export class LocalLibraryService extends ServiceParentService {

  isbnListSubscription: object = Subscription.EMPTY;
  public libraryRefreshed = new Subject<null>();
  localLibrary: LocalLibraryModel;

  constructor(private bookSearch: BookSearchService, private http: HttpClient) {
    super();
    console.log('locallibservice constructor');

    this.localLibrary = new LocalLibraryModel();

    this.fillBookSfromLocalStorage();
    this.isbnListSubscription = <object>this.bookSearch.isbnListArrived.subscribe(({data: isbnList}) => {
      this.checkListInLocalLibrary(isbnList.list)
    })
  }

  fillBookSfromLocalStorage() {
    let localLibrary = localStorage.getItem('localLibrary');
    localLibrary = null
    if (localLibrary !== null) {
      this.localLibrary.fillFromLocalStorage(localLibrary)
      this.saveLocalLibraryToLocalStorage();
    }
  }

  checkListInLocalLibrary(isbnList: Array<string>) {
    isbnList.map((isbn: string) => {
      this.checkIsbnInLocalLibrary(isbn)
    })
  }

  private checkIsbnInLocalLibrary(isbn: string) {
    let bookExists
    bookExists = this.localLibrary.checkBookInLibrary(isbn)
    console.log(bookExists)
    if (!bookExists) {
      this.getBookPrimaryData(isbn).subscribe(({success, data}) => {
        this.localLibrary.addBookPrimaryData(isbn, data)
        this.saveLocalLibraryToLocalStorage();
      }, error => {
        console.dir(error)
        console.dir(error.error.text ?? error.error)
      })
    }
  }

  private getBookPrimaryData(isbn: string): Observable<{ success: any, data: object }> {
    return this.http.get<{ success: any, data: object }>(this._backendUrl + "\\primaryData\\" + isbn);
  }

  private saveLocalLibraryToLocalStorage() {
    localStorage.setItem('localLibrary',JSON.stringify(this.localLibrary))
    console.log('refresh')
    this.libraryRefreshed.next()
  }

  public getPrimaryData(isbn: string): BookPrimaryData {
    if (!this.localLibrary.checkBookInLibrary(isbn)) return new BookPrimaryData([])
    return this.localLibrary.getPrimaryData(isbn)
  }
}
