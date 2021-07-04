import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Subject} from "rxjs";
import {Router} from '@angular/router';
import {BookSearchService} from "../../services/book-search.service";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})

/**
 * parent component for browsing books by category, on multiple pages
 * item/page count, order changeable
 */
export class BrowseComponent implements OnInit {

  /**
   * event subject for resetting the pageNavigator's actual page to 0
   * passed down to page-navigator component
   */
  public pageNavResetRequestSent: Subject<boolean> = new Subject();

  constructor(private searchService: BookSearchService) {
  }

  /**
   * subject trigger function for page navigator reset
   */
  pageNavReset() {
    this.pageNavResetRequestSent.next(true);
  }

  ngOnInit(): void {
    this.searchService.initSearch()
  }

}
