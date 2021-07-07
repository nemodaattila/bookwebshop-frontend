import {Component, OnDestroy, OnInit} from '@angular/core';
import {ComplexSearchBrowserService} from "../../../services/complex-search-browser.service";
import {BookSearchService} from "../../../services/book-search.service";

@Component({
  selector: 'app-complex-search-browser',
  templateUrl: './complex-search-browser.component.html',
  styleUrls: ['./complex-search-browser.component.css']
})
export class ComplexSearchBrowserComponent implements OnInit, OnDestroy {


  public errorText: string = ''

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
    this.errorText = ''
    const ok: boolean = this.complexSearchService.validateValues();
    console.log(ok)
    if (ok) {
      console.log('initsearch')
      this.bookSearch.initSearch()
    }
    else {
      this.errorText = 'Minden Input mezőt töltsön ki, Tagek-nél legalább 1-et jelöljön be'
    }
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
