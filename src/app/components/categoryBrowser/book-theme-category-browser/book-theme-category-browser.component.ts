import { Component, OnInit } from '@angular/core';
import {BookMetaDataService} from "../../../services/book-meta-data.service";
import {Subscription} from "rxjs";
import {BookSearchService} from "../../../services/book-search.service";

@Component({
  selector: 'app-book-theme-category-browser',
  templateUrl: './book-theme-category-browser.component.html',
  styleUrls: ['./book-theme-category-browser.component.css']
})
export class BookThemeCategoryBrowserComponent implements OnInit {

  private metaSubscription = Subscription.EMPTY
  private bookSearchParamRequest = Subscription.EMPTY
  public mainCategory: {[index: number]:string}={};
  public mainCategoryIndex: Array<string>=[];
  private subCategory: {[index: number]:{[index: number]:string}} = {}
  private bookSearchParameter: [string?, number?] = [];

  constructor(private metaDateService: BookMetaDataService, private bookSearch: BookSearchService) {
    this.bookSearch.registerSearchSourceService()
    this.metaSubscription= this.metaDateService.metaDataReady.subscribe((metaData)=>
    {
      console.log('metaNext')
      this.setCategories(metaData)
    })
    this.bookSearchParamRequest = this.bookSearch.searchParamRequestSubject.subscribe(()=>{
        this.passParameterToBookSearchService()
    })
    this.checkServiceReady();
  }

  private checkServiceReady() {
    if (this.metaDateService.checkReadyState()) {
      this.setCategories(this.metaDateService.getCategories())
    }
  }

  private passParameterToBookSearchService()
  {
      if (this.bookSearchParameter.length !== 0) {
        this.bookSearch.setSearchCriterium(this.bookSearchParameter[0] as string,this.bookSearchParameter[1] as number)
      }
  }

  private setCategories(metaData: any)
  {
    this.mainCategory = metaData.mainCategory
    this.subCategory = metaData.subCategory
    this.mainCategoryIndex =(Object.keys(this.mainCategory))
  }

  getSubCategoryById(id: number)
  {
    return this.subCategory[id];
  }

  ngOnInit(): void {

  }

  initAllSearch() {

  }

  onSubComponentNotify(searchParam: [string, number]) {
    this.bookSearchParameter = searchParam
    this.bookSearch.initSearch(false)
  }


}
