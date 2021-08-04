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
  quickSearch: string = '';

  private counter: number = 0;
  private registered: boolean = false;

  private searchParams: { [index: string]: any } = {}

  constructor(private searchService: BookSearchService, private acRoute: ActivatedRoute) {
    console.log('browseConst')
    this.searchService.registerSearchSourceService('BC')
    this.counter = 0;
    this.acrSubs = this.acRoute.queryParams.subscribe(params => {
      console.log('acrouteparamregister')
      console.log(params)
      if (Object.keys(params).length !== 0) {
        let [firstKey] = Object.keys(params)
        this.searchParams[firstKey] = params[firstKey]
      } else
        this.searchParams = {}
      this.searchWhenReady();
    })

    this.acr2Subs = this.acRoute.params.subscribe((params: Params) => {
      console.log('acrouteurlregister')
      console.log(params)
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
    console.log('init')
    this.searchWhenReady();
  }

  private searchWhenReady() {
    console.log(this.counter)
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
