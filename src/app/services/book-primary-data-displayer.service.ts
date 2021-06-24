import {Injectable, Input} from '@angular/core';
import {LocalLibraryService} from "./local-library.service";
import {Subject, Subscription} from "rxjs";
import {BookSearchService} from "./book-search.service";
import {BookMetaDataService} from "./book-meta-data.service";

@Injectable({
  providedIn: 'root'
})
export class BookPrimaryDataDisplayerService {
  get actualIsbnList(): Array<string> {
    return this._actualIsbnList;
  }

  private actualIsbnListSubscription: object = Subscription.EMPTY;
  private localLibraryRefreshSubscription: any = Subscription.EMPTY;
  private metaDataReadySubscription: any = Subscription.EMPTY;
  public actualBookDataRedreshed = new Subject<null>();

  private allFoundCount: number = Infinity;
   private _actualIsbnList: Array<string> =[];
   private actualBookData: any={};
   private allReady: Array<number>=[0,0,0];

  constructor(private metaData: BookMetaDataService, private localLibrary: LocalLibraryService, private bookSearch: BookSearchService) {

    this.localLibraryRefreshSubscription=this.localLibrary.libraryRefreshed.subscribe(()=>{
      this.increaseReadyVariable(1)

  })
    this.actualIsbnListSubscription = <object>this.bookSearch.isbnListArrived.subscribe(({data: isbnList}) => {
      this.allFoundCount = isbnList.count
      this._actualIsbnList = isbnList.list
      this.increaseReadyVariable(2)
    })

    this.metaDataReadySubscription= this.metaData.metaDataReady.subscribe(()=>
    {
      this.increaseReadyVariable(0)
    })
    this.checkServiceReadyStates();

  }

  public getAllCount():number
  {
    return this.allFoundCount;
  }

  private checkServiceReadyStates() {
    this.allReady[0]=(Number(this.metaData.checkReadyState()));
    this.allReady[1]=(Number(this.localLibrary.checkReadyState()));
  }

  increaseReadyVariable(key: number)
  {
    this.allReady[key]=1;
    const sum = this.allReady.reduce((a, b) => a + b, 0);
    if (sum === 3)
      {
        this.getPrimaryDataForActualBooks()
      }

  }

  getPrimaryDataForActualBooks()
  {

    for (let isbn of this._actualIsbnList)
      this.actualBookData[isbn] = this.localLibrary.getPrimaryData(isbn)
      if (this.actualBookData.length !== null)
      {
        this.actualBookDataRedreshed.next();
      }
  }

  public getPrimaryDataByISBN(isbn: string)
  {
    return this.localLibrary.getPrimaryData(isbn);
  }



}
