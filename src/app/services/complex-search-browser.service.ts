import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {BookSearchService} from "./book-search.service";
import {Subscription} from "rxjs";
import {ServiceParentService} from "./service-parent.service";

@Injectable({
  providedIn: 'root'
})
export class ComplexSearchBrowserService extends ServiceParentService {

  private critTypes: {} = {
    "ISBN": "ISBN",
    "Title": "Cím",
    "Author": "Író",
    "Type": "Típus",
    "MainCategory": "Főkategória",
    "Category": "Alkategória",
    "Targetaudience": "Célközönség",
    "Publisher": "Kiadó",
    "Series": "Sorozat",
    "Language": "Nyelv",
    "Year": "Kiadás éve",
    "Pages": "Oldalak száma",
    "Format": "Formátum",
    "Tags": "Tagek",
    "Price": "Ár",
    "Discount": "Kedvezmény"
  };
  selectedCrits: Array<string> = ["ISBN"];
  selectedCritValues: Array<string | number | null> = [];
  selectOption: Array<string> = ["Type", "MainCategory", "Targetaudience", "Language", "Pages", "Price", "Discount"];
  selectOptionGroup: Array<string> = ["Category", "Format"]
  textOption: Array<string> = ["ISBN", "Title", "Year"];
  textWithDatalistOption: Array<string> = ["Author", 'Series', 'Publisher']

  private bookSearchParamRequest = Subscription.EMPTY

  constructor(private bookSearch: BookSearchService) {
    super();

  }

  getSelectedCrits(): Array<string> {
    return this.selectedCrits
  }

  getSelectedCriteriaInputType(index: number): string | undefined {
    if (this.isTextOption(this.selectedCrits[index]))
      return 'text'
    if (this.isTextOptionWithDataList(this.selectedCrits[index]))
      return 'textWithDataList'
    if (this.isSelectOptionGroup(this.selectedCrits[index]))
      return 'selectOptionGroup'
    return undefined
  }

  isTextOption(type: string): boolean {
    return (this.textOption.findIndex((stype) => {
      return stype === type
    })) !== -1
  }

  isTextOptionWithDataList(type: string): boolean {
    return (this.textWithDatalistOption.findIndex((stype) => {
      return stype === type
    })) !== -1
  }

  isSelectOptionGroup(type: string): boolean {
    return (this.selectOptionGroup.findIndex((stype) => {
      return stype === type
    })) !== -1
  }

  public getCriteriaTypes(): {} {
    return this.critTypes
  }

  public setOneSelectedCriteria(index: number, value: string) {
    this.selectedCrits[index] = value
  }

  public setOneSelectedCriteriaValue(index: number, value: string | number | null) {
    this.selectedCritValues[index] = value
  }

  private passParameterToBookSearchService() {
    let params: { [index: string]: any } = {};
    for (let key in this.selectedCrits) {
      params[this.selectedCrits[key]] = this.selectedCritValues[key]
    }
    this.bookSearch.setSearchCriteria(params)
  }

  public subscribeForBookSearch(): void {
    this.bookSearch.registerSearchSourceService()
    this.bookSearchParamRequest = this.bookSearch.searchParamRequestSubject.subscribe(() => {
      this.passParameterToBookSearchService()
    })
  }

  public unsubscribeForBookSearch(): void {
    this.bookSearch.unRegisterSearchService()
    this.bookSearchParamRequest.unsubscribe()
  }
}

