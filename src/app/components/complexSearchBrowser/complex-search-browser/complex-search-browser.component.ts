import {Component, OnInit} from '@angular/core';
import {ComplexSearchBrowserService} from "../../../services/complex-search-browser.service";
import {BookSearchService} from "../../../services/book-search.service";

@Component({
  selector: 'app-complex-search-browser',
  templateUrl: './complex-search-browser.component.html',
  styleUrls: ['./complex-search-browser.component.css']
})
export class ComplexSearchBrowserComponent implements OnInit {


  constructor(private bookSearch: BookSearchService, private complexSearchService: ComplexSearchBrowserService) {
  }

  ngOnInit(): void {

  }

  getSelectedCrits(): Array<string>
  {
    return this.complexSearchService.getSelectedCrits()
  }

  initSearch() {
    console.log('initsearch')
    this.bookSearch.initSearch()
  }
}
