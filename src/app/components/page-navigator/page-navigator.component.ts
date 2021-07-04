import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BookSearchService} from "../../services/book-search.service";
import {Subject, Subscription} from "rxjs";
import {PageNavigatorModel} from "../../models/page-navigator-model";

@Component({
  selector: 'app-page-navigator',
  templateUrl: './page-navigator.component.html',
  styleUrls: ['./page-navigator.component.css']
})
/**
 * displays a menu for switching pages in browsing of found books
 */
export class PageNavigatorComponent implements OnInit, OnDestroy {

  /**
   * subscription for the BookSearchService's parameter collector call
   * @private
   */
  private bookSearchParamRequest = Subscription.EMPTY

  /**
   * subscribing for the BookSearchService's isbn list broadcast
   * @private
   */
  private actualIsbnListSubscription: Subscription = Subscription.EMPTY;

  /**
   * model class for the PageNavigator
   */
  public navModel: PageNavigatorModel

  /**
   * fake array for displaying page links
   */
  public fakeCountArray: Array<any> = []

  /**
   * trigger for resetting the page number for zero, comes through parent component
   */
  @Input() pageResetRequest: Subject<boolean> = new Subject<boolean>();

  /**
   * creates PageNavigatorModel
   * registers in BookSearchService's parameter source
   * subscribes for BookSearchService's isbn list broadcast:
   * saves data to model, creates fake model based on number of pages
   * subscribes for BookSearchService's search parameter request:
   * sets BookSearchService offset parameter
   * @param bookSearch BookSearchService instance
   */
  constructor(private bookSearch: BookSearchService) {
    this.navModel = new PageNavigatorModel();
    this.bookSearch.registerSearchSourceService()
    this.actualIsbnListSubscription = this.bookSearch.isbnListArrived.subscribe(({data: isbnList}) => {
      this.navModel.setData(isbnList.list.length, isbnList.count, this.bookSearch.getQuantityPerPage());
      this.fakeCountArray = new Array(this.navModel.getPageNumber());
    })

    this.bookSearchParamRequest = this.bookSearch.searchParamRequestSubject.subscribe(() => {
      this.bookSearch.setOffsetCriteria(this.navModel.getOffset());
    })
  }

  /**
   * subscribes fot page reset request:
   * reset offset to 0, thus page number to 1
   */
  ngOnInit(): void {
    this.pageResetRequest.subscribe(() => {
      this.navModel.setOffset(0)
    })
  }

  /**
   * event click on numbered page links (1,3)
   * modifies model's offset parameter, inits BookSearchService's search
   * @param page broses page number to be loaded
   */
  public pageNumberClicked(page: number) {
    this.navModel.setStartByClick(page - 1)
    this.bookSearch.initSearch(false)
  }

  /**
   * event click on Next or Previous labeled links (Következő / előző)
   * next : +1 -> x+1
   * previous : -1 -> x-1
   * modifies model's offset parameter, inits BookSearchService's search
   * @param num indicates the direction of the page switch:
   */
  public nextPrevClicked(num: number) {
    this.navModel.incDecPageNumber(num)
    this.bookSearch.initSearch(false)
  }

  ngOnDestroy(): void {
    this.actualIsbnListSubscription.unsubscribe()
    this.bookSearchParamRequest.unsubscribe()
    this.bookSearch.unRegisterSearchService()
  }

}
