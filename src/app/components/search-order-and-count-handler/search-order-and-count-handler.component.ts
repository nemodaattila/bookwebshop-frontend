import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {BookSearchService} from "../../services/book/book-search.service";

@Component({
  selector: 'app-search-order-and-count-handler',
  templateUrl: './search-order-and-count-handler.component.html',
  styleUrls: ['./search-order-and-count-handler.component.css']
})
/**
 * component for displaying select inputs for:
 * setting the order of result (e.g by name, price)
 * setting the direction of order (ascending, descending)
 * setting the number of displayed search results (e.g. 10, 50)
 */
export class SearchOrderAndCountHandlerComponent implements OnDestroy{

  /**
   * subscription for the BookSearchService's parameter collector call
   * @private
   */
  private bookSearchParamRequest = Subscription.EMPTY

  /**
   * method of ordering : e.g : title price
   * @private
   */
  private orderType: string = "Title";

  /**
   * direction of ordering: ASC or DESC
   * @private
   */
  private direction: string = "ASC";

  /**
   * umber of displayed search results (e.g. 10, 50)
   * @private
   */
  private quantity: number = 10;

  /**
   * event request for resetting page number to 0 (in PageNavigator)
   */
  @Output() pageResetRequest: EventEmitter<null> = new EventEmitter<null>();

  /**
   * registers in BookSearchService's parameter source
   * subscribes for BookSearchService's search parameter request:
   * passes parameters: order theme, order direction , number of displayable results
   * @param bookSearch BookSearchService instance
   */
  constructor(private bookSearch: BookSearchService) {
    this.bookSearch.registerSearchSourceService()
    this.bookSearchParamRequest = this.bookSearch.searchParamRequestSubject.subscribe(() => {
      this.bookSearch.setOrderAndLimit(this.orderType, this.direction, this.quantity)
    })
  }

  ngOnDestroy(): void {
        this.bookSearchParamRequest.unsubscribe()
        this.bookSearch.unRegisterSearchService()
    }

  /**
   * event change saves the values of the input select elements and inits a
   * BookSearchService search
   * if the number of displayed result changes, emits a PageResetRequest
   * @param parameter
   * @param value
   */
  parameterRefresh(parameter: string, value: string | number) {
    let def = false
    if (parameter === "OACSortSelect") {
      this.orderType = value as string;
    }
    if (parameter === "OACDirSelect") {
      this.direction = value as string;
    }
    if (parameter === "OACQuantitySelect") {
      def = true
      this.quantity = Number(value);
      this.pageResetRequest.emit();
    }
    this.bookSearch.initSearch(def)
  }

}
