import {Injectable} from '@angular/core';
import {BookSearchService} from "./book-search.service";
import {Subscription} from "rxjs";
import {ServiceParentService} from "./service-parent.service";
import {BookMetaDataService} from "./book-meta-data.service";

@Injectable({
  providedIn: 'root'
})

/**
 * service for complex book search ( on multiple criteria)
 */
export class ComplexSearchBrowserService extends ServiceParentService {

  /**
   * types of criteria key: name, value: label
   * @private
   */
  private criteriaTypes: { [index: string]: string } = {
    "Category": "Alkategória",
    "TargetAudience": "Célközönség",
    "Title": "Cím",
    "Format": "Formátum",
    "MainCategory": "Főkategória",
    "ISBN": "ISBN",
    "Author": "Író",
    "Discount": "Kedvezmény",
    "Year": "Kiadás éve",
    "Publisher": "Kiadó",
    "Language": "Nyelv",
    "Pages": "Oldalak száma",
    "Series": "Sorozat",
    "Tags": "Tagek",
    "Price": "Teljes Ár",
    "Type": "Típus",
  };

  /**
   * array of selected criteria (through components)
   */
  selectedCriteria: Array<string> = [];

  /**
   * values linked to selectedCriteria
   */
  selectedCriteriaValues: Array<string | number | Array<number> | null> = [];

  /**
   * criteria types with select input type
   */
  selectInput: Array<string> = ["Type", "MainCategory", "TargetAudience", "Language", "Pages", "Price", "Discount"];

  /**
   * criteria types with select input type with option group
   */
  selectWithOptionGroup: Array<string> = ["Category", "Format"]

  /**
   * criteria types with text input
   */
  textInput: Array<string> = ["ISBN", "Title"];

  /**
   * criteria type with number input
   */
  numberInput: Array<string> = ["Year"];

  /**
   * criteria type with text input implemented with datalist
   */
  textInputWithDatalist: Array<string> = ["Author", 'Series', 'Publisher']

  /**
   * criteria type not displayed in criteria type selector' options (CriteriaSelectElementComponent),
   * in the second and further selectors
   */
  public ignoredSelectableCriteria: Array<string> = []

  /**
   * select options for selected criteria types
   */
  public arrayOptions: { [index: string]: Array<string> } = {
    "Discount": ["0", "1-5", "6-15", "16-30", "31-50", "51-"],
    "Pages": ["0-100", "101-250", "251-500", "501-1000", "1000-"],
    "Price": ["0-1000", "1001-3000", "3001-6000", "6001-10000", "10000-"]
  }

  /**
   * subscription for BookSearchService's data query request
   * @private
   */
  private bookSearchParamRequest = Subscription.EMPTY

  constructor(private bookSearch: BookSearchService, private metaDataServ: BookMetaDataService) {
    super();
    this.selectedCriteria.push(Object.keys(this.criteriaTypes)[0])
  }

  /**
   * adds a new Search criteria input (CriteriaSelectorComponent)
   */
  addNewSearchCriteria() {
    if (this.selectedCriteria.length !== Object.keys(this.criteriaTypes).length) {
      this.ignoredSelectableCriteria.push(this.selectedCriteria[this.selectedCriteria.length - 1])
      this.selectedCriteria.push(this.getFirstNotIgnored())
    }
  }

  /**
   * removes a Search criteria input (CriteriaSelectorComponent)
   * @param key index number of the input
   */
  deleteCriteria(key: number) {
    this.ignoredSelectableCriteria = this.ignoredSelectableCriteria.filter(item => item !== this.selectedCriteria[key])
    this.selectedCriteria.splice(key, 1)
  }

  /**
   * returns the first criteria type which is not in selectedCriteria
   * @param num
   */
  getFirstNotIgnored(num: number = 0): string {
    let objKey = Object.keys(this.criteriaTypes)[num]
    if (this.selectedCriteria.findIndex((type) => {
      return type === objKey
    }) !== -1) {
      return this.getFirstNotIgnored(++num)
    } else
      return objKey;
  }

  /**
   * return all criteria types except what is in ignoredSelectableCriteria array
   * @param id
   */
  public getCriteriaTypes(id: number): { [index: string]: string } {
    let criteriaTypes = {...this.criteriaTypes}
    for (let key in this.ignoredSelectableCriteria) {
      if (this.ignoredSelectableCriteria.hasOwnProperty(key))
        if (parseInt(key) < id)
          delete criteriaTypes[this.ignoredSelectableCriteria[key]]
    }
    return criteriaTypes
  }

  /**
   * queries metaDataService for data, depending on criteriaType
   * @param criteriaType type of criteria
   */
  getGroupedOptions(criteriaType: string): Array<any> {

    let group, groupIndex, items
    if (criteriaType === "Category") {
      let temp = this.metaDataServ.getCategories()
      group = temp.mainCategory
      groupIndex = Object.keys(group)
      items = temp.subCategory
    }
    if (criteriaType === "Format") {
      let temp = this.metaDataServ.getFormats()
      group = temp.type
      groupIndex = Object.keys(group)
      items = temp.format
    }
    return [group, groupIndex, items]
  }

  /**
   * gets options for select input type criteria (from variable or from metaDataService), depending on type
   * @param type criteria
   */
  public getArrayOptions(type: string) {
    if ((Object.keys(this.arrayOptions).findIndex((option) => {
      return option === type
    })) !== -1) {
      return this.arrayOptions[type]
    }
    if (type === 'Language') {
      return this.metaDataServ.getLanguageAsArray();
    }
    if (type === 'MainCategory') {
      return this.metaDataServ.getMainCategoryAsArray()
    }
    if (type === 'TargetAudience') {
      return this.metaDataServ.getTargetAudienceAsArray()
    }
    if (type === 'Type') {
      return this.metaDataServ.getTypeAsArray()
    }

    return []
  }

  /**
   * returns selected criteria
   */
  getSelectedCriteria(): Array<string> {
    return this.selectedCriteria
  }

  /**
   * return the type of the criteria (as string), based on index (component serial number)
   * @param index
   */
  getSelectedCriteriaInputType(index: number): string | undefined {
    if (this.selectedCriteria[index] === "Tags") {
      return "tag";
    }
    if (this.isTextInput(this.selectedCriteria[index]))
      return 'text'
    if (this.isTextInputWithDataList(this.selectedCriteria[index]))
      return 'textWithDataList'
    if (this.isSelectWithOptionGroup(this.selectedCriteria[index]))
      return 'selectOptionGroup'
    if (this.isNumberInput(this.selectedCriteria[index]))
      return 'number'
    if (this.isSelectInput(this.selectedCriteria[index]))
      return 'select'
    return undefined
  }

  /**
   * checks if criteria type is text
   * @param type criteria name
   */
  isTextInput(type: string): boolean {
    return (this.textInput.findIndex((value) => {
      return value === type
    })) !== -1
  }

  /**
   * checks if criteria type is number
   * @param type criteria name
   */
  isNumberInput(type: string): boolean {
    return (this.numberInput.findIndex((value) => {
      return value === type
    })) !== -1
  }

  /**
   * checks if criteria type is datalist
   * @param type criteria name
   */
  isTextInputWithDataList(type: string): boolean {
    return (this.textInputWithDatalist.findIndex((value) => {
      return value === type
    })) !== -1
  }

  /**
   * checks if criteria type is select
   * @param type criteria name
   */
  isSelectInput(type: string): boolean {
    return (this.selectInput.findIndex((value) => {
      return value === type
    })) !== -1
  }

  /**
   * checks if criteria type is selectWithOptionGroup
   * @param type criteria name
   */
  isSelectWithOptionGroup(type: string): boolean {
    return (this.selectWithOptionGroup.findIndex((value) => {
      return value === type
    })) !== -1
  }

  /**
   * set a criteria type in selectedCriteria array
   * @param index index of the component
   * @param value type of criteria
   */
  public setOneSelectedCriteria(index: number, value: string) {
    this.selectedCriteria[index] = value
  }

  /**
   * sets a criteria value
   * @param index serial number of the criteria
   * @param value value connected to the criteria
   */
  public setOneSelectedCriteriaValue(index: number, value: string | number | Array<number> | null) {
    this.selectedCriteriaValues[index] = value
  }

  /**
   * passes data (searc
   * h criteria types and values) to the BookSearchService
   * @private
   */
  private passParameterToBookSearchService() {
    let params: { [index: string]: any } = {};
    for (let key in this.selectedCriteria) {
      if (this.selectedCriteria.hasOwnProperty(key))
        params[this.selectedCriteria[key]] = this.selectedCriteriaValues[key]
    }
    this.bookSearch.setSearchCriteria(params)
  }

  /**
   * registers to BookSearchService as source object
   * registers to BookSearchService for search data call
   */
  public subscribeForBookSearch(): void {
    this.bookSearch.registerSearchSourceService()
    this.bookSearchParamRequest = this.bookSearch.searchParamRequestSubject.subscribe(() => {
      this.passParameterToBookSearchService()
    })
  }

  /**
   * unregisters from BookSearchService as source object
   * unregisters from BookSearchService for search data call
   */
  public unsubscribeForBookSearch(): void {
    this.bookSearch.unRegisterSearchService()
    this.bookSearchParamRequest.unsubscribe()
  }

  /**
   *  validates all criteria values
   *  they must be filled
   */
  validateValues(): boolean {
    for (let value of this.selectedCriteriaValues) {
      if (value === undefined || value === "" || value === null || value === [])
        return false
    }
    return true
  }

}

