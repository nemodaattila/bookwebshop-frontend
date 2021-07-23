import {Component, Input, OnInit} from '@angular/core';
import {ComplexSearchBrowserService} from "../../../services/book/complex-search-browser.service";
import {HttpClient} from "@angular/common/http";
import {backendUrl} from "../../../globals";

@Component({
  selector: 'app-criteria-input-text-with-data-list',
  templateUrl: './criteria-input-text-with-data-list.component.html',
  styleUrls: ['./criteria-input-text-with-data-list.component.css']
})

/**
 * input text type Search Component with datalist, for complex book search
 */
export class CriteriaInputTextWithDataListComponent implements OnInit {

  constructor(private http: HttpClient, private complexSearch: ComplexSearchBrowserService) {
  }

  /**
   * serial number of the criteria component
   */
  @Input() public id: number = 0;

  /**
   * type of linked criteria: Publisher, Author, or Series
   */
  criteriaType: string = '';

  /**
   * value of the input text field
   */
  public textValue: string = '';

  /**
   * values in the datalist
   */
  public dataList: Array<string> = [];

  ngOnInit(): void {
    this.criteriaType = this.complexSearch.getSelectedCriteria()[this.id]
  }

  /**
   * passes the value of the input field to the complex search service
   * initiates data pull for data lists
   */
  passValueToService() {
    this.getDataListFromServer()
    this.complexSearch.setOneSelectedCriteriaValue(this.id, this.textValue)
  }

  /**
   * retrieves data from server to the datalist based on the values of the input field
   */
  getDataListFromServer() {
    if (this.textValue.length > 2) {
      this.http.get<any>(backendUrl + '\\datalist\\' + this.criteriaType + "\\" + this.textValue).subscribe(data => {
        if ((data.hasOwnProperty('success') && data.success === true)) {
          this.dataList = data.data
        }
      }, error => {
        console.log(error)
        console.dir(error.error.text)
        return;
      });
    }
  }
}
