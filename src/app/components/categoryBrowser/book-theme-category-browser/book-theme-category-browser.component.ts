import {Component, EventEmitter, Output} from '@angular/core';
import {BookMetaDataService} from "../../../services/book-meta-data.service";
import { Subscription} from "rxjs";
import {BookSearchService} from "../../../services/book-search.service";
import {BookMetaData} from "../../../models/book-meta-data";

@Component({
  selector: 'app-book-theme-category-browser',
  templateUrl: './book-theme-category-browser.component.html',
  styleUrls: ['./book-theme-category-browser.component.css']
})

/**
 * parent component for browsing books by category
 */
export class BookThemeCategoryBrowserComponent{

  /**
   * subscription for getting meta data from book metaDataService
   * @private
   */
  private metaSubscription = Subscription.EMPTY

  /**
   * subscription for the BookSearchService's parameter collection
   * @private
   */
  private bookSearchParamRequest = Subscription.EMPTY

  /**
   * eventEmitter for signaling the pageNavigator for reset
   */
  @Output() pageResetRequest: EventEmitter<null> = new EventEmitter<null>();

  /**
   * object containing main categories by id number, passed from BookMetaDataService
   */
  public mainCategory: { [index: number]: string } = {};

  /**
   * indexes of the mainCategory in array
   */
  public mainCategoryIndex: Array<string> = [];

  /**
   * object containing subcategories by id number, grouped by main category, passed from BookMetaDataService
   * @private
   */
  private subCategory: { [index: number]: { [index: number]: string } } = {}

  /**
   * search parameters to be passed to BookSearchService
   * first parameter: MainCategory or Category as string
   * second parameter: the id of the chosen MainCategory or Category (SubCategory)
   * @private
   */
  private bookSearchParameter: [string?, number?] = [];

  /**
   * registers the component in the BookSearchService as parameter source
   * subscribes for meta data readiness of BookMetaDataService
   * subscribes for parameter passing of BookSearchService
   * @param metaDateService service for handling book metadata
   * @param bookSearch service for book search based on given parameters
   */
  constructor(private metaDateService: BookMetaDataService, private bookSearch: BookSearchService) {
    this.bookSearch.registerSearchSourceService()
    this.metaSubscription = this.metaDateService.metaDataReady.subscribe((metaData: BookMetaData) => {
      this.setCategories(metaData)
    })
    this.bookSearchParamRequest = this.bookSearch.searchParamRequestSubject.subscribe(() => {
      this.passParameterToBookSearchService()
    })
    this.checkServiceReady();
  }

  /**
   * checks that the data for metaDateService is loaded
   * if true fills the category parameters
   * @private
   */
  private checkServiceReady() {
    if (this.metaDateService.checkReadyState()) {
      this.setCategories(this.metaDateService.getCategories())
    }
  }

  /**
   * passes search parameters to BookSearchService, triggered by subscription event
   * @private
   */
  private passParameterToBookSearchService() {
    if (this.bookSearchParameter.length !== 0) {
      this.bookSearch.setSearchCriterium(this.bookSearchParameter[0] as string, this.bookSearchParameter[1] as number)
    } else {
      this.bookSearch.setSearchCriterium(null, null)
    }
  }

  /**
   * fills category data form data passed from BookMetaDataService
   * creates category index array
   * @param metaData BookMetaData or object with only main and subcategory
   * @private
   */
  private setCategories(metaData: BookMetaData | any) {
    this.mainCategory = metaData.mainCategory ?? metaData.getMainCategory()
    this.subCategory = metaData.subCategory ?? metaData.getSubCategory()
    this.mainCategoryIndex = (Object.keys(this.mainCategory))
  }

  /**
   * returns subcategories by main category ID
   * @param id
   */
  getSubCategoryById(id: number) {
    return this.subCategory[id];
  }

  /**
   * inits books search without category
   */
  initAllSearch() {
    this.bookSearchParameter = []
    this.pageResetRequest.emit();
    this.bookSearch.initSearch(false)
  }

  /**
   * init search based on data from subcomponents (MainCategoryBrowser or SubCategoryBrowser)
   * @param searchParam
   * first parameter: MainCategory or Category as string
   * second parameter: the id of the chosen MainCategory or Category (SubCategory)
   */
  onSubComponentNotify(searchParam: [string, number]) {
    this.bookSearchParameter = searchParam
    this.pageResetRequest.emit();
    this.bookSearch.initSearch(false)
  }

}
