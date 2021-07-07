import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {BookSearchService} from "./book-search.service";
import {Subscription} from "rxjs";
import {ServiceParentService} from "./service-parent.service";
import {BookMetaDataService} from "./book-meta-data.service";

@Injectable({
  providedIn: 'root'
})
export class ComplexSearchBrowserService extends ServiceParentService {

  private critTypes:  { [index: string]: string } = {
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
  selectedCrits: Array<string> = [];
  selectedCritValues: Array<string | number | Array<number> | null> = [];
  selectInput: Array<string> = ["Type", "MainCategory", "TargetAudience", "Language", "Pages", "Price", "Discount"];
  selectWithOptionGroup: Array<string> = ["Category", "Format"]
  textInput: Array<string> = ["ISBN", "Title"];
  numberInput: Array<string> = ["Year"];
  textInputWithDatalist: Array<string> = ["Author", 'Series', 'Publisher']

  public ignoredSelectableCriteria: Array<string>=[]

  public arrayOptions: { [index: string]: Array<string> } = {
    "Discount": ["0","1-5","6-15","16-30","31-50","51-"],
    "Pages": ["0-100","101-250","251-500","501-1000","1000-"],
    "Price": ["0-1000","1001-3000","3001-6000","6001-10000","10000-"]
  }

  private bookSearchParamRequest = Subscription.EMPTY

  constructor(private bookSearch: BookSearchService, private metaDataServ: BookMetaDataService) {
    super();
    this.selectedCrits.push(this.critTypes[Object.keys(this.critTypes)[0]])
  }
  addNewSearchCriteria() {
    if (this.selectedCrits.length!==Object.keys(this.critTypes).length) {
      this.ignoredSelectableCriteria.push(this.selectedCrits[this.selectedCrits.length - 1])
      this.selectedCrits.push(this.getFirstNotIgnored())
    }
  }

  deleteCriteria(key: number) {
    this.ignoredSelectableCriteria=this.ignoredSelectableCriteria.filter(item => item !== this.selectedCrits[key])
    this.selectedCrits.splice(key,1)
  }

  getFirstNotIgnored(num: number = 0): string
  {
      let objKey = Object.keys(this.critTypes)[num]
    if (this.selectedCrits.findIndex((stype) => {
      return stype === objKey
    }) !== -1)
    {
      return this.getFirstNotIgnored(++num)
    }
    else
      return objKey;
  }

  public getCriteriaTypes(id: number): { [index: string]: string } {
    let critTypes = {...this.critTypes}
    for (let key in this.ignoredSelectableCriteria)
    {
      if (parseInt(key) < id)
      delete critTypes[this.ignoredSelectableCriteria[key]]
    }
    return critTypes
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
    if (type === 'Type')
    {
      return this.metaDataServ.getTypeAsArray()
    }

    return []
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

  validateValues(): boolean {
    console.log('validate')
    console.log(this.selectedCritValues)
    for (let value of this.selectedCritValues) {
      console.log(value)
      if (value === undefined || value === "" || value === null || value === [])
        return false
    }
    return true

  }

}

