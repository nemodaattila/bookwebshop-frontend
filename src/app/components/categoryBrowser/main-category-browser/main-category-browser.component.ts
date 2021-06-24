import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {BookPrimaryData} from "../../../models/book-primary-data";

@Component({
  selector: 'app-main-category-browser',
  templateUrl: './main-category-browser.component.html',
  styleUrls: ['./main-category-browser.component.css']
})
export class MainCategoryBrowserComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() subcategories: {[index: number]:string} ={}
  @Input() mainCategoryID: number = 0;
  @Input() label?: string;

  @Output() searchNotify: EventEmitter<[string, number]> = new EventEmitter<[string, number]>();


  ngOnInit(): void {
  }

  ngOnChanges() {
  console.log(this)
  }

  subCategoryButtonEvent()
  {

  }

  categorySearch()
  {
    console.log('search')
    // console.log(['MainCategory', this.mainCategoryID])
    this.searchNotify.emit(['MainCategory', this.mainCategoryID])
  }

}
