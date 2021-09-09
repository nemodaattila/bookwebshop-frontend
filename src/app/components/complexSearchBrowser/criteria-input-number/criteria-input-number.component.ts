import {Component, Input, OnInit} from '@angular/core';
import {ComplexSearchBrowserService} from "../../../services/book/complex-search-browser.service";

@Component({
  selector: 'app-criteria-input-number',
  templateUrl: './criteria-input-number.component.html',
  styleUrls: ['./criteria-input-number.component.css']
})
/**
 * input number type Criteria Component for complex search
 */
export class CriteriaInputNumberComponent implements OnInit {

  /**
   * serial number of the criteria component
   */
  @Input() public id: number = 0;
  /**
   * value of the input number field
   */
  public numberValue: number = 0;

  constructor(public complexSearchService: ComplexSearchBrowserService) {
  }

  ngOnInit(): void {
    this.passValueToService()
  }

  /**
   * passes the value of the input field to the complex search service
   */
  passValueToService() {
    this.complexSearchService.setOneSelectedCriteriaValue(this.id, this.numberValue)
  }

}
