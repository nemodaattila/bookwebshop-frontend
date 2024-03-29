import {Injectable} from '@angular/core';
import {LocalLibraryService} from "./local-library.service";
import {Subject, Subscription} from "rxjs";
import {BookSearchService} from "./book-search.service";
import {BookMetaDataService} from "./book-meta-data.service";
import {BookData} from "../../models/bookData/book-data";

@Injectable({
  providedIn: 'root'
})
/**
 * stores data for the actually displayed books
 */
export class BookPrimaryDataDisplayerService {

  /**
   * trigger when the data for the actually displayed data is refreshed
   */
  public actualBookDataRefreshed = new Subject<null>();
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
  private actualBookData: { [index: string]: BookData } = {};

  /**
   * shows that all
   prerequisite is loaded : metadata loaded, isbn list arrived, local library refreshed
   * @private
   */
  private allReady: Array<number> = [0, 0, 0];

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

    this.bookSearch.localOrderingRequest.subscribe((data) => {
      this.localOrder(data)
    })
  }

  getActualIsbnList(): Array<string> {
    return this.actualIsbnList;
  }

  /**
   * returns the num of all results
   */
  public getAllCount(): number {
    return this.allFoundCount;
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
      this.actualBookData[isbn] = this.localLibrary.getBookData(isbn)
    if (this.actualBookData.length !== null) {
      this.actualBookDataRefreshed.next();
    }
  }

  /**
   * return's a book's primary data by isbn
   * @param isbn isbn of a book
   */
  public getBookDataByISBN(isbn: string) {
    return this.localLibrary.getBookData(isbn);
  }

  /**
   * aks for prerequisite service readiness property
   * @private
   */
  private checkServiceReadyStates() {
    this.allReady[0] = (Number(this.metaData.checkReadyState()));
    this.allReady[1] = (Number(this.localLibrary.checkReadyState()));
  }

  /**
   * sorts the actual isbn list based in order parameters
   * @param data order parameters order attribute and order direction
   * @private
   */
  private localOrder(data: [string, string]) {
    let [order, dir] = data;
    this.actualIsbnList.sort((isbn1, isbn2) => {
      let param1: string | number, param2: string | number

      if (order === 'Title') {
        param1 = this.actualBookData[isbn1].getTitle();
        param2 = this.actualBookData[isbn2].getTitle();
      }
      if (order === 'Author') {
        param1 = Object.values(this.actualBookData[isbn1].getAuthor())[0];
        param2 = Object.values(this.actualBookData[isbn2].getAuthor())[0];
      }
      if (order === "Price") {
        param1 = this.actualBookData[isbn1].getPrice();
        param2 = this.actualBookData[isbn2].getPrice();

      }
      // @ts-ignore
      if (param1 > param2) return (dir === 'DESC') ? -1 : 1;
      // @ts-ignore
      if (param1 < param2) return (dir === 'DESC') ? 1 : -1;
      return 0;
    })
  }
}
