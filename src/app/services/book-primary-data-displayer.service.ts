import {Injectable, Input} from '@angular/core';
import {LocalLibraryService} from "./local-library.service";
import {Subscription} from "rxjs";
import {BookSearchService} from "./book-search.service";

@Injectable({
  providedIn: 'root'
})
export class BookPrimaryDataDisplayerService {
  get actualIsbnList(): Array<string> {
    return this._actualIsbnList;
  }

  private actualIsbnListSubscription: object = Subscription.EMPTY;
  private localLibraryRefreshSubscription: any = Subscription.EMPTY;

   private _actualIsbnList: Array<string> =[];
   private actualBookData: any={};

  constructor(private localLibrary: LocalLibraryService, private bookSearch: BookSearchService) {
  console.log('primdataservice controller');
    this.localLibraryRefreshSubscription=this.localLibrary.libraryRefreshed.subscribe(()=>{
    console.log('refreshprim')
    this.getPrimaryDataForActualBooks()
  })
    this.actualIsbnListSubscription = <object>this.bookSearch.isbnListArrived.subscribe(({data: isbnList}) => {
      console.log('isbnlistarrived')
      this._actualIsbnList = isbnList.list
      // this.getPrimaryDataForActualBooks()
    })
  }

  getPrimaryDataForActualBooks()
  {
    for (let isbn of this._actualIsbnList)
      this.actualBookData[isbn] = this.localLibrary.getPrimaryData(isbn)
  }

  public getPrimaryDataByISBN(isbn: string)
  {
    return this.localLibrary.getPrimaryData(isbn);
  }



}
