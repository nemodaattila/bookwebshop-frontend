import {Injectable} from '@angular/core';
import {BookSearchService} from "./book-search.service";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ComplexSearchBrowserService {

  private critTypes: { } = {
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
  selectOption: Array<string> = ["Type", "MainCategory", "Targetaudience", "Language", "Pages", "Format", "Price", "Discount"];
  textOption: Array<string> = ["ISBN", "Title", "Year"];
  textWithDatalistOption: Array<string> = ["Author",'Series', 'Publisher']

  private bookSearchParamRequest = Subscription.EMPTY
  constructor(private bookSearch: BookSearchService) {
    this.bookSearch.registerSearchSourceService()
    this.bookSearchParamRequest = this.bookSearch.searchParamRequestSubject.subscribe(() => {
      this.passParameterToBookSearchService()
    })
  }

  getSelectedCrits(): Array<string>
  {
    return this.selectedCrits
  }

  getSelectedCriteriaInputType(index: number): string | undefined
  {
      if (this.isTextOption(this.selectedCrits[index]))
        return 'text'
      return undefined
  }

  isTextOption(type: string):boolean
  {
    return  (this.textOption.findIndex((stype) => {
      return stype === type
    })) !== -1
  }

  public getCriteriaTypes(): {  }
  {
    return this.critTypes
  }

  public setOneSelectedCriteria(index: number, value: string)
  {
    this.selectedCrits[index]=value
  }
  public setOneSelectedCriteriaValue(index: number, value: string|number|null)
  {
    this.selectedCritValues[index]=value
  }

  private passParameterToBookSearchService() {
    let params:{[index: string]:any} ={};
    for (let key in this.selectedCrits)
      {
        params[this.selectedCrits[key]] =  this.selectedCritValues[key]
      }
    this.bookSearch.setSearchCriteria(params)
  }
}

