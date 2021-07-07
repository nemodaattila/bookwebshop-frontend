import {Component, OnDestroy, OnInit} from '@angular/core';
import {ComplexSearchBrowserService} from "../../../services/complex-search-browser.service";
import {BookSearchService} from "../../../services/book-search.service";

@Component({
  selector: 'app-complex-search-browser',
  templateUrl: './complex-search-browser.component.html',
  styleUrls: ['./complex-search-browser.component.css']
})
export class ComplexSearchBrowserComponent implements OnInit, OnDestroy {


  constructor(private bookSearch: BookSearchService, private complexSearchService: ComplexSearchBrowserService) {
  }

  ngOnInit(): void {
    this.complexSearchService.subscribeForBookSearch()
  }

  getSelectedCrits(): Array<string>
  {
    return this.complexSearchService.getSelectedCrits()
  }

  initSearch() {
    console.log('initsearch')
    this.bookSearch.initSearch()
  }

  ngOnDestroy(): void {
    this.complexSearchService.unsubscribeForBookSearch()
  }

  addNewCriteria() {
    this.complexSearchService.addNewSearchCriteria()
  }

  deleteCriteria(key: number) {
    this.complexSearchService.deleteCriteria(key)
  }
}
