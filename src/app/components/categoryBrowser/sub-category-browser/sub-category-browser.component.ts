import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-sub-category-browser',
  templateUrl: './sub-category-browser.component.html',
  styleUrls: ['./sub-category-browser.component.css']
})

/**
 * displays subcategory for searching books based on subcategory
 */
export class SubCategoryBrowserComponent {

  /**
   * name / label of subcategory - passed down from MainCategoryBrowser
   */
  @Input() public label?: string;

  /**
   * id of subcategory - passed down from MainCategoryBrowser
   */
  @Input() public id: number = 0;

  /**
   * event emitter for book search, targeted to BookThemeCategoryBrowser
   * ['Category', <categoryId>]
   */
  @Output() subSearchNotify: EventEmitter<[string, number]> = new EventEmitter<[string, number]>();

  /**
   * emits a trigger for BookThemeCategoryBrowser for book search
   * param: ['Category', <categoryId>]
   */
  initSubSearch() {
    this.subSearchNotify.emit(['Category', this.id])
  }

}
