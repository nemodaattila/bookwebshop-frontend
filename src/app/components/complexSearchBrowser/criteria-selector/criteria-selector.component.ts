import {Component, Input, OnInit} from '@angular/core';
import {ComplexSearchBrowserService} from "../../../services/complex-search-browser.service";

@Component({
  selector: 'app-criteria-selector',
  templateUrl: './criteria-selector.component.html',
  styleUrls: ['./criteria-selector.component.css']
})
export class CriteriaSelectorComponent implements OnInit {



  constructor(public complexSearchService: ComplexSearchBrowserService) { }

  @Input() public id: number = 0;

  public selectedCriteriaInputType?: string = 'text'

  ngOnInit(): void {
    this.selectedCriteriaInputType=this.complexSearchService.getSelectedCriteriaInputType(this.id)
    console.log(this.selectedCriteriaInputType)
  }

}
