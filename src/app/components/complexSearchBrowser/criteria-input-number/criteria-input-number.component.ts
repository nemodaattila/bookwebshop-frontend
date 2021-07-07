import {Component, Input, OnInit} from '@angular/core';
import {ComplexSearchBrowserService} from "../../../services/complex-search-browser.service";

@Component({
  selector: 'app-criteria-input-number',
  templateUrl: './criteria-input-number.component.html',
  styleUrls: ['./criteria-input-number.component.css']
})
export class CriteriaInputNumberComponent implements OnInit {

  constructor(public complexSearchService: ComplexSearchBrowserService) { }

  @Input() public id: number = 0;
  public numberValue: number = 0;

  ngOnInit(): void {
    this.passValueToService()
  }

  passValueToService()
  {
    this.complexSearchService.setOneSelectedCriteriaValue(this.id, this.numberValue)
    console.log(this.numberValue)
    console.log(this.complexSearchService)
  }

}
