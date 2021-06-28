import {Injectable} from '@angular/core';
import {LocalLibraryService} from "./local-library.service";
import {Subject, Subscription} from "rxjs";
import {BookSearchService} from "./book-search.service";
import {BookMetaDataService} from "./book-meta-data.service";

@Injectable({
  providedIn: 'root'
})
/**
 * stores data for the actually displayed books
 */
export class BookPrimaryDataDisplayerService {

  /**
   * subscription for the BookMetaData isbn list broadcast
   * @private
   */
  private actualIsbnListSubscription: object = Subscription.EMPTY;

  /**
   * subscription for actualised local library signal
   * @private
   */
  private localLibraryRefreshSubscription: any = Subscription.EMPTY;

  /**
   * subscription for metadata readiness signal
   * @private
   */
  private metaDataReadySubscription: any = Subscription.EMPTY;

  /**
   * trigger when the data for the actually displayed data is refreshed
   */
  public actualBookDataRefreshed = new Subject<null>();

  /**
   * number of results that meets the search criteria of the actual search
   * @private
   */
  private allFoundCount: number = Infinity;

  /**
   * isbn list of the actual search result
   * @private
   */
  private actualIsbnList: Array<string> = [];

  /**
   * data for books in the actualIsbnList
   * @private
   */
  private actualBookData: any = {};

  /**
   * shows that all
   prerequisite is loaded : metadata loaded, isbn list arrived, local library refreshed
   * @private
   */
  private allReady: Array<number> = [0, 0, 0];

  getActualIsbnList(): Array<string> {
    return this.actualIsbnList;
  }

  /**
   * subscribes for BookMetaDataService readiness signal
   * subscribes BookSearchService's isbn list broadcast
   * subscribes for LocalLibraryService refresh signal
   * @param metaData
   * @param localLibrary
   * @param bookSearch
   */
  constructor(private metaData: BookMetaDataService, private localLibrary: LocalLibraryService, private bookSearch: BookSearchService) {

    this.localLibraryRefreshSubscription = this.localLibrary.libraryRefreshed.subscribe(() => {
      this.increaseReadyVariable(1)

    })
    this.actualIsbnListSubscription = <object>this.bookSearch.isbnListArrived.subscribe(({data: isbnList}) => {
      this.allFoundCount = isbnList.count
      this.actualIsbnList = isbnList.list
      this.increaseReadyVariable(2)
    })

    this.metaDataReadySubscription = this.metaData.metaDataReady.subscribe(() => {
      this.increaseReadyVariable(0)
    })
    this.checkServiceReadyStates();

  }

  /**
   * returns the num of all results
   */
  public getAllCount(): number {
    return this.allFoundCount;
  }

  /**
   * aks for prerequisite services readiness property
   * @private
   */
  private checkServiceReadyStates() {
    this.allReady[0] = (Number(this.metaData.checkReadyState()));
    this.allReady[1] = (Number(this.localLibrary.checkReadyState()));
  }

  /**
   * increases the values for prerequisite parameter
   * if ready calls for actual book data
   * @param key
   */
  increaseReadyVariable(key: number) {
    this.allReady[key] = 1;
    const sum = this.allReady.reduce((a, b) => a + b, 0);
    if (sum === 3) {
      this.getPrimaryDataForActualBooks()
    }

  }

  /**
   * queries LocalLibraryService for data of the actually displayed books
   */
  getPrimaryDataForActualBooks() {
    for (let isbn of this.actualIsbnList)
      this.actualBookData[isbn] = this.localLibrary.getPrimaryData(isbn)
    if (this.actualBookData.length !== null) {
      this.actualBookDataRefreshed.next();
    }
  }

  /**
   * return's a book's primary data by isbn
   * @param isbn isbn of a book
   */
  public getPrimaryDataByISBN(isbn: string) {
    return this.localLibrary.getPrimaryData(isbn);
  }
}
