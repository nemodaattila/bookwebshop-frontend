import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {ActivatedRoute, Params} from '@angular/router';
import {BookSearchService} from "../../services/book/book-search.service";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})

/**
 * parent component for browsing books by category, on multiple pages
 * item/page count, order changeable
 */
export class BrowseComponent implements OnInit, OnDestroy {

  /**
   * event subject for resetting the pageNavigator's actual page to 0
   * passed down to page-navigator component
   */
  public pageNavResetRequestSent: Subject<boolean> = new Subject();

  /**
   *  subscription for BookSearchService data search request (if quickSearch not empty)
   * @private
   */
  private bookSearchParamRequest = Subscription.EMPTY

  /**
   * subscription to activatedRoute
   */
  acrSubs: Subscription = Subscription.EMPTY;

  /**
   * quickSearch search parameter - comes from ActivatedRoute
   */
  quickSearch: string = '';

  constructor(private searchService: BookSearchService, private acRoute: ActivatedRoute) {
  }

  /**
   * subject trigger function for page navigator reset
   */
  pageNavReset() {
    this.pageNavResetRequestSent.next(true);
  }

  ngOnInit(): void {
    this.acrSubs = this.acRoute.params.subscribe((value: Params) => {
      if (value['quick'] !== undefined) {
        this.quickSearch = value['quick'];
        this.searchService.registerSearchSourceService()
        this.bookSearchParamRequest = this.searchService.searchParamRequestSubject.subscribe(() => {
          if (this.quickSearch.length > 2)
            this.searchService.setSearchCriteria({'Quick': this.quickSearch});
        })
      }
      this.searchService.initSearch()
    });
  }

  ngOnDestroy(): void {
    if (this.quickSearch !== '') {
      this.bookSearchParamRequest.unsubscribe()
      this.searchService.unRegisterSearchService()
    }
  }

}
