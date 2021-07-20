import {Component, Input, OnInit} from '@angular/core';
import {ComplexSearchBrowserService} from "../../../services/book/complex-search-browser.service";

@Component({
  selector: 'app-criteria-selector',
  templateUrl: './criteria-selector.component.html',
  styleUrls: ['./criteria-selector.component.css']
})

/**
 * component for every complex search input field
 * contains a criteria type selector, and an appropriate input field
 */
export class CriteriaSelectorComponent implements OnInit {

  constructor(public complexSearchService: ComplexSearchBrowserService) {
  }

  /**
   * serial number of the container
   */
  @Input() public id: number = 0;

  /**
   * type of the selected criteria input i.e: number, text, textWithDataList
   */
  public selectedCriteriaInputType?: string = 'text'

  /**
   * receives the criteria type from service
   */
  ngOnInit(): void {
    this.selectedCriteriaInputType = this.complexSearchService.getSelectedCriteriaInputType(this.id)
  }

  /**
   * removes the the given criteria from the search service
   * @param key serial number of the criteria
   */
  deleteCriteria(key: number) {
    this.complexSearchService.deleteCriteria(key)
  }

}
