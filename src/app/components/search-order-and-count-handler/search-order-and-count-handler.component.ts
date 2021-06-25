import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BookSearchService} from "../../services/book-search.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search-order-and-count-handler',
  templateUrl: './search-order-and-count-handler.component.html',
  styleUrls: ['./search-order-and-count-handler.component.css']
})
export class SearchOrderAndCountHandlerComponent implements OnInit {

  @Output() pageResetRequest: EventEmitter<null> = new EventEmitter<null>();

  constructor(private bookSearch: BookSearchService) {
    this.bookSearch.registerSearchSourceService()
    this.bookSearchParamRequest = this.bookSearch.searchParamRequestSubject.subscribe(()=>{
      this.passParameterToBookSearchService()
    })

  }

  ngOnInit(): void {
  }
  private bookSearchParamRequest = Subscription.EMPTY

  private sortType: string="Title";
  private direction: string="ASC";
  private quantity: number=10;

  parameterRefresh(paramater: string, value: string | number)
  {
    console.log([paramater, value])
    let def= false
    if (paramater === "OACSortSelect")
    {
      this.sortType = value as string;
    }
    if (paramater === "OACDirSelect")
    {
      this.direction = value as string;
    }
    if (paramater === "OACQuantitySelect")
    {
      def = true
      this.quantity = value as number;
      this.pageResetRequest.emit();
    }

    this.bookSearch.initSearch(def)
  }

  passParameterToBookSearchService()
  {
    this.bookSearch.setOrderAndLimit(this.sortType, this.direction, this.quantity)
  }

}
