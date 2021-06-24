import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {BookPrimaryData} from "../../../models/book-primary-data";

@Component({
  selector: 'app-main-category-browser',
  templateUrl: './main-category-browser.component.html',
  styleUrls: ['./main-category-browser.component.css']
})
export class MainCategoryBrowserComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() public subcategories: {[index: number]:string} ={}
  @Input() mainCategoryID: number = 0;
  @Input() label?: string;
  public subCategoryIds: Array<number>=[]
  public areSubCategoriesVisible: boolean = false
  public buttonValue: string='+';

  @Output() searchNotify: EventEmitter<[string, number]> = new EventEmitter<[string, number]>();


  ngOnInit(): void {
  }

  getSubcatLabelByID(id: number): string
  {
    return this.subcategories[id]
  }

  ngOnChanges() {
    const ids = Object.keys(this.subcategories);
    this.subCategoryIds = ids.map(value => parseInt(value))
  }

  subCategoryButtonEvent()
  {
    this.areSubCategoriesVisible=!this.areSubCategoriesVisible
    this.buttonValue=this.areSubCategoriesVisible?'-':'+';
  }

  onSubComponentNotify(searchParam: [string, number]) {
    this.searchNotify.emit(searchParam)
  }

  categorySearch()
  {
    console.log('search')
    // console.log(['MainCategory', this.mainCategoryID])
    this.searchNotify.emit(['MainCategory', this.mainCategoryID])
  }

}
