import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {BookSearchService} from "./book-search.service";
import {Subscription} from "rxjs";
import {ServiceParentService} from "./service-parent.service";
import {BookMetaDataService} from "./book-meta-data.service";

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
    "TargetAudience": "Célközönség",
    "Publisher": "Kiadó",
    "Series": "Sorozat",
    "Language": "Nyelv",
    "Year": "Kiadás éve",
    "Pages": "Oldalak száma",
    "Format": "Formátum",
    "Tags": "Tagek",
    "Price": "Teljes Ár",
    "Discount": "Kedvezmény"
  };
  selectedCrits: Array<string> = ["ISBN"];
  selectedCritValues: Array<string | number | Array<number> | null> = [];
  selectInput: Array<string> = ["Type", "MainCategory", "TargetAudience", "Language", "Pages", "Price", "Discount"];
  selectWithOptionGroup: Array<string> = ["Category", "Format"]
  textInput: Array<string> = ["ISBN", "Title"];
  numberInput: Array<string> = ["Year"];
  textInputWithDatalist: Array<string> = ["Author", 'Series', 'Publisher']

  public arrayOptions: { [index: string]: Array<string> } = {
    "Discount": ["0","1-5","6-15","16-30","31-50","51-"],
    "Pages": ["0-100","101-250","251-500","501-1000","1000-"],
    "Price": ["0-1000","1001-3000","3001-6000","6001-10000","10000-"]
  }

  public getArrayOptions(type : string)
  {
    if ((Object.keys(this.arrayOptions).findIndex((stype) => {
      return stype === type
    })) !== -1)
    {
      return this.arrayOptions[type]
    }
    if (type === 'Language')
    {
      return this.metaDataServ.getLanguageAsArray();
    }
    if (type === 'MainCategory')
    {
      return this.metaDataServ.getMainCategoryAsArray()
    }
    if (type === 'TargetAudience')
    {
      return this.metaDataServ.getTargetAudienceAsArray()
    }

    return []
  }

  private bookSearchParamRequest = Subscription.EMPTY

  constructor(private bookSearch: BookSearchService, private metaDataServ: BookMetaDataService) {
    super();

  }

  getSelectedCrits(): Array<string> {
    return this.selectedCrits
  }

  getSelectedCriteriaInputType(index: number): string | undefined {
    if (this.selectedCrits[index] === "Tags")
    {
      return "tag";
    }
    if (this.isTextInput(this.selectedCrits[index]))
      return 'text'
    if (this.isTextInputWithDataList(this.selectedCrits[index]))
      return 'textWithDataList'
    if (this.isSelectWithOptionGroup(this.selectedCrits[index]))
      return 'selectOptionGroup'
    if (this.isNumberInput(this.selectedCrits[index]))
      return 'number'
    if (this.isSelectInput(this.selectedCrits[index]))
      return 'select'
    return undefined
  }

  isTextInput(type: string): boolean {
    return (this.textInput.findIndex((stype) => {
      return stype === type
    })) !== -1
  }
  isNumberInput(type: string): boolean {
    return (this.numberInput.findIndex((stype) => {
      return stype === type
    })) !== -1
  }

  isTextInputWithDataList(type: string): boolean {
    return (this.textInputWithDatalist.findIndex((stype) => {
      return stype === type
    })) !== -1
  }

  isSelectInput(type: string): boolean {
    return (this.selectInput.findIndex((stype) => {
      return stype === type
    })) !== -1
  }

  isSelectWithOptionGroup(type: string): boolean {
    return (this.selectWithOptionGroup.findIndex((stype) => {
      return stype === type
    })) !== -1
  }

  public getCriteriaTypes(): {} {
    return this.critTypes
  }

  public setOneSelectedCriteria(index: number, value: string) {
    this.selectedCrits[index] = value
  }

  public setOneSelectedCriteriaValue(index: number, value: string | number | Array<number> | null) {
    this.selectedCritValues[index] = value
  }

  private passParameterToBookSearchService() {
    let params: { [index: string]: any } = {};
    for (let key in this.selectedCrits) {
      params[this.selectedCrits[key]] = this.selectedCritValues[key]
    }
    console.log(params)
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

