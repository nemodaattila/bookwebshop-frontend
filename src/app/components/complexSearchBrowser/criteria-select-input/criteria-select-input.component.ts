import {Component, Input, OnInit} from '@angular/core';
import {ComplexSearchBrowserService} from "../../../services/complex-search-browser.service";

@Component({
  selector: 'app-criteria-select-input',
  templateUrl: './criteria-select-input.component.html',
  styleUrls: ['./criteria-select-input.component.css']
})
export class CriteriaSelectInputComponent implements OnInit {

  constructor(private complexSearch: ComplexSearchBrowserService) { }

  @Input() public id: number = 0;
  critType: string = '';
  public selectedOption: number = 1;
  public options : Array<string> = []

  ngOnInit(): void {
    this.critType = this.complexSearch.getSelectedCrits()[this.id]
    this.options = this.complexSearch.getArrayOptions(this.critType)
    for (let key of this.options)
    {
      console.log(typeof key)
    }
    console.log(this.critType)
    console.log(this.options)
    this.complexSearch.setOneSelectedCriteria(this.id, this.critType)
    this.valueSelected()
  }



  valueSelected() {
    console.log(this.selectedOption)

    this.complexSearch.setOneSelectedCriteriaValue(this.id, this.selectedOption)
  }

  isEmpty(key: number) {
    console.log(this.options[key] === undefined)
    return this.options[key] === undefined
  }
}
