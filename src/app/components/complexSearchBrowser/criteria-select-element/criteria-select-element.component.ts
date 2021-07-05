import {Component, Input, OnInit} from '@angular/core';
import {ComplexSearchBrowserService} from "../../../services/complex-search-browser.service";

@Component({
  selector: 'app-criteria-select-element',
  templateUrl: './criteria-select-element.component.html',
  styleUrls: ['./criteria-select-element.component.css']
})
export class CriteriaSelectElementComponent implements OnInit {

  constructor(public complexSearchService: ComplexSearchBrowserService) { }

  @Input() public id: number = 0;

  public selectedCriteria: string = 'ISBN'

  ngOnInit(): void {
    this.selectedCriteria = this.complexSearchService.getSelectedCrits()[this.id]
  }

  changeSelectedCriteria() {
    this.complexSearchService.setOneSelectedCriteria(this.id, this.selectedCriteria)
    this.complexSearchService.setOneSelectedCriteriaValue(this.id, null)
  }
}
