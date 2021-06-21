import { Injectable } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {BookSearchService} from "./book-search.service";
import {LocalLibraryModel} from "../models/local-library-model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ServiceParentService} from "./service-parent.service";
import {isObject} from "rxjs/internal-compatibility";
import {LocalLibraryBookModel} from "../models/local-library-book-model";

@Injectable({
  providedIn: 'root'
})
export class LocalLibraryService extends ServiceParentService{

  isbnListSubscription: object = Subscription.EMPTY;

  localLibrary: LocalLibraryModel;

  constructor(private bookSearch: BookSearchService, private http: HttpClient) {
    super();
    this.localLibrary = new LocalLibraryModel();

    this.fillBookSfromLocalStorage();
    this.isbnListSubscription = <object>this.bookSearch.isbnListArrived.subscribe(({data: isbnList}) => {
      this.checkListInLocalLibrary(isbnList.list)
    })
  }

    fillBookSfromLocalStorage() {
      let localLibrary = localStorage.getItem('localLibrary');
      console.log(localLibrary)
      // localLibrary = null
      if (localLibrary !== null ) {
        // this.model.fillBooksFromObjectLessThenOneDay(JSON.parse(localLibrary));
        // this.saveLocalLibraryToLocalStorage();
      }
    }

  checkListInLocalLibrary(isbnList: Array<string>) {
    isbnList.map((isbn: string)=>{
      this.checkIsbnInLocalLibrary(isbn)
    })
  }

  private checkIsbnInLocalLibrary(isbn: string) {
    let bookExists
    if (this.localLibrary !== undefined)
      bookExists = this.localLibrary.checkBookInLibrary(isbn)
      console.log(bookExists)
    if (!bookExists)
    {
      this.getBookPrimaryData(isbn).subscribe(({success,data})=>{
      this.localLibrary.addBookPrimaryData(isbn, data)
    }, error => {
        console.dir (error)
      console.dir(error.error.text ??  error.error)
    })
    }
  }

  private getBookPrimaryData(isbn: string):Observable<{success: any, data: object}>
  {
    return this.http.get<{success: any, data: object}>(this._backendUrl + "\\primaryData\\" + isbn);
  }

}
