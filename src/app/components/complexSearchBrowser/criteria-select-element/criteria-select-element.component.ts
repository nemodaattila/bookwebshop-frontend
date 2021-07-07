import {Component, Input, OnInit} from '@angular/core';
import {ComplexSearchBrowserService} from "../../../services/complex-search-browser.service";

@Component({
  selector: 'app-criteria-select-element',
  templateUrl: './criteria-select-element.component.html',
  styleUrls: ['./criteria-select-element.component.css']
})
//DO unique sort directive instead of keyvalue pipe in html
export class CriteriaSelectElementComponent implements OnInit {

  constructor(private complexSearchService: ComplexSearchBrowserService) { }

  @Input() public id: number = 0;

  public selectedCriteria: string = ''

  public getCriteriaTypes():{}
  {
    return this.complexSearchService.getCriteriaTypes(this.id)

  }

  ngOnInit(): void {
    this.selectedCriteria = this.complexSearchService.getSelectedCrits()[this.id]
  }



  changeSelectedCriteria() {
    this.complexSearchService.setOneSelectedCriteria(this.id, this.selectedCriteria)
    this.complexSearchService.setOneSelectedCriteriaValue(this.id, null)
  }
}
