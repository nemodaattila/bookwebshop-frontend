import {Component, Input, OnInit} from '@angular/core';
import {ComplexSearchBrowserService} from "../../../services/book/complex-search-browser.service";

@Component({
  selector: 'app-criteria-input-text',
  templateUrl: './criteria-input-text.component.html',
  styleUrls: ['./criteria-input-text.component.css']
})

/**
 * input text type Criteria Component for complex book search
 */
export class CriteriaInputTextComponent implements OnInit {

  /**
   * serial number of the criteria component
   */
  @Input() public id: number = 0;
  /**
   * value of the input field
   */
  public textValue: string = '';

  constructor(public complexSearchService: ComplexSearchBrowserService) {
  }

  ngOnInit(): void {
    this.complexSearchService.setOneSelectedCriteriaValue(this.id, this.textValue)
  }

  /**
   * passes the value of the input field to the complex search service
   */
  passValueToService() {
    this.complexSearchService.setOneSelectedCriteriaValue(this.id, this.textValue)
  }

}
