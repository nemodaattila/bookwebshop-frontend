import {Component, Input, OnInit} from '@angular/core';
import {ComplexSearchBrowserService} from "../../../services/book/complex-search-browser.service";

@Component({
  selector: 'app-criteria-select-element',
  templateUrl: './criteria-select-element.component.html',
  styleUrls: ['./criteria-select-element.component.css']
})

/**
 * component for displaying an input select field, for selecting a criteria type
 * for complex book search
 */
export class CriteriaSelectElementComponent implements OnInit {

  /**
   * serial number of the criteria component
   */
  @Input() public id: number = 0;
  /**
   * index/name of the chosen criteria
   */
  public selectedCriteria: string = ''

  constructor(private complexSearchService: ComplexSearchBrowserService) {
  }

  /**
   * retrieves all criteria type from service
   */
  public getCriteriaTypes(): {} {
    return this.complexSearchService.getCriteriaTypes(this.id)

  }

  ngOnInit(): void {
    this.selectedCriteria = this.complexSearchService.getSelectedCriteria()[this.id]
  }

  /**
   * passes the type of the selected criteria (overwriting the earlier data)
   * sets the value of the criteria in service to null
   */
  changeSelectedCriteria() {
    this.complexSearchService.setOneSelectedCriteria(this.id, this.selectedCriteria)
    this.complexSearchService.setOneSelectedCriteriaValue(this.id, null)
  }
}
