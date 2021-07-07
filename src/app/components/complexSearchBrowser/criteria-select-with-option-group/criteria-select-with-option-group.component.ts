import {Component, Input, OnInit} from '@angular/core';
import {ComplexSearchBrowserService} from "../../../services/complex-search-browser.service";

@Component({
  selector: 'app-criteria-select-with-option-group',
  templateUrl: './criteria-select-with-option-group.component.html',
  styleUrls: ['./criteria-select-with-option-group.component.css']
})

/**
 * input select search Component with OptionGroup for complex book search
 */
export class CriteriaSelectWithOptionGroupComponent implements OnInit {

  constructor(private complexSearch: ComplexSearchBrowserService) {
  }

  /**
   * serial number for component
   */
  @Input() public id: number = 0;

  /**
   * criteria type of the component (Format or SubCategory)
   */
  criteriaType: string = '';

  /**
   * labels for optionGroups
   */
  public group: { [index: number]: string } = {}

  /**
   * indexes of option groups
   */
  public groupIndex: Array<string> = []
  /**
   * select options grouped by option groups
   */
  public item: { [index: number]: { [index: number]: string } } = {}
  /**
   * value of the selected option
   */
  public selectedOption: number = 1;

  ngOnInit(): void {
    this.criteriaType = this.complexSearch.getSelectedCriteria()[this.id]
    this.getOptions()
    this.valueSelected()
  }

  /**
   * receives options and option groups from service based on criteria type
   */
  getOptions() {
    [this.group, this.groupIndex, this.item] = this.complexSearch.getGroupedOptions(this.criteriaType)
  }

  /**
   * passes selected value to the search service
   */
  valueSelected() {
    this.complexSearch.setOneSelectedCriteriaValue(this.id, this.selectedOption)
  }

  /**
   * returns a group label by index
   * @param gr index of the group
   */
  getGroupByIndex(gr: string) {
    return this.group[parseInt(gr)]
  }

  /**
   * return all indexes associated with an option group
   * @param gr index of the group
   */
  getItemGroupIndexesByIndex(gr: string) {
    return Object.keys(this.item[parseInt(gr)])
  }

  /**
   * returns a value/option label from the item object based on group name/label, item index
   * @param group name/label of an option group
   * @param index index of the item in the group
   */
  getItemLabel(group: string, index: string) {
    return this.item[parseInt(group)][parseInt(index)]
  }
}
