import {Component, OnDestroy, OnInit} from '@angular/core';
import {ComplexSearchBrowserService} from "../../../services/complex-search-browser.service";
import {BookSearchService} from "../../../services/book-search.service";

@Component({
  selector: 'app-complex-search-browser',
  templateUrl: './complex-search-browser.component.html',
  styleUrls: ['./complex-search-browser.component.css']
})
/**
 * component for displaying complex search browser/ multiple search criteria
 */
export class ComplexSearchBrowserComponent implements OnInit, OnDestroy {

  /**
   * message in case of validation error
   */
  public errorText: string = ''

  constructor(private bookSearch: BookSearchService, private complexSearchService: ComplexSearchBrowserService) {
  }

  /**
   * initiates registration for book search service as parameter source
   */
  ngOnInit(): void {
    this.complexSearchService.subscribeForBookSearch()
  }

  /**
   * retrieves selected criteria(s) from complex search service
   */
  getSelectedCriteria(): Array<string> {
    return this.complexSearchService.getSelectedCriteria()
  }

  /**
   * calls input validation
   * if validation is OK, initiates book search
   * else displays error message
   */
  initSearch() {
    this.errorText = ''
    const ok: boolean = this.complexSearchService.validateValues();
    if (ok) {
      this.bookSearch.initSearch()
    } else {
      this.errorText = 'Minden Input mezőt töltsön ki, Tagek-nél legalább 1-et jelöljön be'
    }
  }

  /**
   * unsubscribes from book search
   */
  ngOnDestroy(): void {
    this.complexSearchService.unsubscribeForBookSearch()
  }

  /**
   * creates a new criteria (CriteriaSelector component)
   */
  addNewCriteria() {
    this.complexSearchService.addNewSearchCriteria()
  }

  /**
   * removes a criteria (CriteriaSelector component)
   * @param key the key of the criteria to be removed
   */

}
