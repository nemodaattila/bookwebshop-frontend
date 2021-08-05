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
  acr2Subs: Subscription = Subscription.EMPTY;
  /**
   * quickSearch search parameter - comes from ActivatedRoute
   */

  /**
   * counts loaded components (subscription + init)
   * @private
   */
  private counter: number = 0;

  /**
   * stores search parameters activateRoute (quick search and BookAllDataDisplayer)
   * @private
   */
  private searchParams: { [index: string]: any } = {}

  /**
   * subscribes to activatedRoutes queryParams and params for search parameters
   * subscribes to BookSearchService for search parameter transfer
   * @param searchService
   * @param acRoute
   */
  constructor(private searchService: BookSearchService, private acRoute: ActivatedRoute) {
    this.searchService.registerSearchSourceService('BC')
    this.counter = 0;
    this.acrSubs = this.acRoute.queryParams.subscribe(params => {
      if (Object.keys(params).length !== 0) {
        let [firstKey] = Object.keys(params)
        this.searchParams[firstKey] = params[firstKey]
      } else
        this.searchParams = {}
      this.searchWhenReady();
    })

    this.acr2Subs = this.acRoute.params.subscribe((params: Params) => {
      if (params['quick'] !== undefined && params['quick'].length > 2) {
        this.searchParams['Quick'] = params['quick'];
      }
      this.searchWhenReady();
    });

    this.bookSearchParamRequest = this.searchService.searchParamRequestSubject.subscribe(() => {
      this.searchService.setSearchCriteria('BC', this.searchParams);
    })
  }

  /**
   * subject trigger function for page navigator reset
   */
  pageNavReset() {
    this.pageNavResetRequestSent.next(true);
  }

  ngOnInit(): void {
    this.searchService.setDefault()
    this.searchWhenReady();
  }

  /**
   * calls for search if subscriptions happened and init happens
   * @private
   */
  private searchWhenReady() {
    this.counter++;
    if (this.counter > 2) {
      this.searchService.initSearch()
    }
  }

  ngOnDestroy(): void {
    this.bookSearchParamRequest.unsubscribe()
    this.searchService.unRegisterSearchService('BC')
    this.acrSubs.unsubscribe()
    this.acr2Subs.unsubscribe()
  }
}
