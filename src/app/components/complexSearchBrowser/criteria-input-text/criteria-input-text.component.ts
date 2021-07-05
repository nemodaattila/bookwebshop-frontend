import {Component, Input, OnInit} from '@angular/core';
import {ComplexSearchBrowserService} from "../../../services/complex-search-browser.service";

@Component({
  selector: 'app-criteria-input-text',
  templateUrl: './criteria-input-text.component.html',
  styleUrls: ['./criteria-input-text.component.css']
})
export class CriteriaInputTextComponent implements OnInit {

  constructor(public complexSearchService: ComplexSearchBrowserService) { }

  ngOnInit(): void {
  }

  @Input() public id: number = 0;
  public textValue: string = '';

  passValueToService()
  {
    this.complexSearchService.setOneSelectedCriteriaValue(this.id, this.textValue)
    console.log(this.textValue)
    console.log(this.complexSearchService)
  }

}
