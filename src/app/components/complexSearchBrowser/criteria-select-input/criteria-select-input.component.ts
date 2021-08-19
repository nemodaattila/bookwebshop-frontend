import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ComplexSearchBrowserService} from "../../../services/book/complex-search-browser.service";

@Component({
  selector: 'app-criteria-select-input',
  templateUrl: './criteria-select-input.component.html',
  styleUrls: ['./criteria-select-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * input select type Criteria Component for complex book search
 */
export class CriteriaSelectInputComponent implements OnInit {

  constructor(private complexSearch: ComplexSearchBrowserService) {
  }

  /**
   * serial number of the component
   */
  @Input() public id: number = 0;

  /**
   * criteria type of the select component e.g. price, targetAudience
   */
  criteriaType: string = '';

  /**
   * value of the select field's selected Option
   */
  public selectedOption: number = 1;

  /**
   * possible options for the select field
   */
  public options: Array<string> = []

  /**
   * receives options for the select field
   * receives the criteria type
   */
  ngOnInit(): void {
    this.criteriaType = this.complexSearch.getSelectedCriteria()[this.id]
    if (this.criteriaType === 'TargetAudience') this.selectedOption = 11
    this.options = this.complexSearch.getArrayOptions(this.criteriaType)
    this.valueSelected()
  }

  /**
   * passes the value of the selected input options to the search service
   */
  valueSelected() {
    this.complexSearch.setOneSelectedCriteriaValue(this.id, this.selectedOption)
  }

  /**
   * checks if the given value of an array is undefined
   * @param key
   */
  isEmpty(key: number) {
    console.log(key)
    return this.options[key] === undefined
  }
}
