import { Component, OnInit } from '@angular/core';
import {BookMetaDataService} from "../../../services/book-meta-data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-book-theme-category-browser',
  templateUrl: './book-theme-category-browser.component.html',
  styleUrls: ['./book-theme-category-browser.component.css']
})
export class BookThemeCategoryBrowserComponent implements OnInit {

  private _metaSubscription = Subscription.EMPTY
  private _mainCategory?: Array<string>;
  private subCategory?: Array<any>

  constructor(private metaDateService: BookMetaDataService) {
    this._metaSubscription= this.metaDateService.metaDataReady.subscribe((metaData)=>
    {
      // console.log(metaData)
      this._mainCategory = metaData.mainCategory
      this.subCategory = metaData.subCategory
      console.log(this)
    })
  }

  ngOnInit(): void {

  }

  initAllSearch() {

  }
}
