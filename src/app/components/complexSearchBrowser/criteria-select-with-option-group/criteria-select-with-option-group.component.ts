import {Component, Input, NgIterable, OnInit} from '@angular/core';
import {BookMetaDataService} from "../../../services/book-meta-data.service";
import {ComplexSearchBrowserService} from "../../../services/complex-search-browser.service";

@Component({
  selector: 'app-criteria-select-with-option-group',
  templateUrl: './criteria-select-with-option-group.component.html',
  styleUrls: ['./criteria-select-with-option-group.component.css']
})
export class CriteriaSelectWithOptionGroupComponent implements OnInit {

  constructor(private complexSearch: ComplexSearchBrowserService, private bookMeta: BookMetaDataService) {
  }

  @Input() public id: number = 0;
  critType: string = '';
  public group: { [index: number]: string } = {}
  public groupIndex: Array<string> = []
  public item: { [index: number]: { [index: number]: string } } = {}
  public selectedOption: number = 1;

  ngOnInit(): void {
    this.critType = this.complexSearch.getSelectedCrits()[this.id]
    this.getOptions()
  }

  getOptions() {
    if (this.critType === "Category") {
      let temp = this.bookMeta.getCategories()
      this.group = temp.mainCategory
      this.groupIndex = Object.keys(this.group)
      this.item = temp.subCategory
    }
  }

  valueSelected() {
    this.complexSearch.setOneSelectedCriteria(this.id, "Category")
    this.complexSearch.setOneSelectedCriteriaValue(this.id, this.selectedOption)
  }

  getGroupByIndex(gr: string) {
    return this.group[parseInt(gr)]
  }

  getItemGroupIndexesByindex(gr: string) {
    return Object.keys(this.item[parseInt(gr)])
  }

  getItemLabel(group: string, index: string) {
    return this.item[parseInt(group)][parseInt(index)]
  }
}
