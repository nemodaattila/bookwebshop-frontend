import {Component, Input, OnInit} from '@angular/core';
import {ComplexSearchBrowserService} from "../../../services/complex-search-browser.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-criteria-input-text-with-data-list',
  templateUrl: './criteria-input-text-with-data-list.component.html',
  styleUrls: ['./criteria-input-text-with-data-list.component.css']
})
export class CriteriaInputTextWithDataListComponent implements OnInit {

  constructor(private http: HttpClient, private complexSearch: ComplexSearchBrowserService) {
  }

  @Input() public id: number = 0;
  critType: string = '';
  public textValue: string = '';
  public dataList: Array<string> = [];

  ngOnInit(): void {
    this.critType = this.complexSearch.getSelectedCrits()[this.id]
    console.log(this)

  }

  passValueToService() {

    this.getDataListFromServer()
    this.complexSearch.setOneSelectedCriteriaValue(this.id, this.textValue)

    console.log(this.textValue)
  }

  getDataListFromServer() {
    if (this.textValue.length > 2) {
      this.http.get<any>(this.complexSearch.getBackendUrl() + '\\datalist\\' + this.critType + "\\" + this.textValue).subscribe(data => {
        if ((data.hasOwnProperty('success') && data.success === true)) {
          this.dataList = data.data
          console.log(this.dataList)

          // this.saveMetaToModel(data.data);
          // this.saveMetaDataToLocalStorage()
          // this.readyState = true;
          // this.metaDataReady.next(this.metaData)
          // console.log(this.metaData)
        }
      }, error => {
        console.log(error)
        console.dir(error.error.text)
        return;
      });
    }
  }
}
