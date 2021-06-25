import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

@Component({
  selector: 'app-main-category-browser',
  templateUrl: './main-category-browser.component.html',
  styleUrls: ['./main-category-browser.component.css']
})

/**
 * displays a link for searching Books based on main category
 */
export class MainCategoryBrowserComponent implements OnChanges {

  /**
   * subcategories under this main category passed from BookThemeCategoryBrowser Component
   */
  @Input() public subcategories: { [index: number]: string } = {}

  /**
   * id if the main category passed from BookThemeCategoryBrowser Component
   */
  @Input() mainCategoryID: number = 0;

  /**
   * label / name of  main category passed from BookThemeCategoryBrowser Component
   */
  @Input() label?: string;

  /**
   * ids of subcategories in an array form
   */
  public subCategoryIds: Array<number> = []

  /**
   * shows if the subcategories are visible
   */
  public areSubCategoriesVisible: boolean = false

  /**
   * value/symbol for opening / closing subcategories: +/-
   */
  public buttonValue: string = '+';

  /**
   * event emitter for requesting the pageNavigator for resetting to page 1, at category switch
   * first parameter: MainCategory or Category as string
   * second parameter: the id of the chosen MainCategory or Category (SubCategory)
   * @private
   */
  @Output() searchNotify: EventEmitter<[string, number]> = new EventEmitter<[string, number]>();

  /**
   * returns the label of a subcategory based on id
   * @param id id of the subcategory
   */
  getSubCategoryLabelByID(id: number): string {
    return this.subcategories[id]
  }

  /**
   * refreshes the array of ids of subcategories
   */
  ngOnChanges() {
    const ids = Object.keys(this.subcategories);
    this.subCategoryIds = ids.map(value => parseInt(value))
  }

  /**
   * event function of clicking on the subcategory opener/closer button
   * shows/hides subcategories, changes the buttons value/ symbol (+/-)
   */
  subCategoryButtonEvent() {
    this.areSubCategoriesVisible = !this.areSubCategoriesVisible
    this.buttonValue = this.areSubCategoriesVisible ? '-' : '+';
  }

  /**
   * receives and passes book search parameters form SUbCategoryBrowser to BookThemeCategoryBrowser
   * @param searchParam
   * first parameter: MainCategory or Category as string
   * second parameter: the id of the chosen MainCategory or Category (SubCategory)
   */
  onSubComponentNotify(searchParam: [string, number]) {
    this.searchNotify.emit(searchParam)
  }

  /**
   * sends parameters for book search based on main category
   */
  categorySearch() {
    this.searchNotify.emit(['MainCategory', this.mainCategoryID])
  }

}
