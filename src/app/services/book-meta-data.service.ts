import {Injectable, OnInit} from '@angular/core';
import {ServiceParentService} from "./service-parent.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BookMetaData} from "../models/book-meta-data";

@Injectable({
  providedIn: 'root'
})
export class BookMetaDataService extends ServiceParentService implements OnInit {

  metaData?: BookMetaData;

  constructor(private http: HttpClient) {
    super();

    this.checkMetaDataInLocalStorage();
  }

  ngOnInit() {
    this.checkMetaDataInLocalStorage();
  }

  private checkMetaDataInLocalStorage() {
    let date;

    let metadata = localStorage.getItem('metadata');
    console.log(metadata)
    if (metadata) {

      [metadata, date] = JSON.parse(metadata);

      let acttime = parseInt((new Date().getTime() / 1000).toFixed(0))
      let metaDataTimeStamp = (acttime - date)
      if (metaDataTimeStamp > 3600000) {
        this.getMetaDataFromServer()
      } else
        this.saveMetaToModel(metadata)
    } else
      this.getMetaDataFromServer()
  }

  private getMetaDataFromServer() {
    console.log("metadatarefresh")
    this.http.get<any>(this._backendUrl + '/metadata').subscribe(data => {

      if ((data.hasOwnProperty('success') && data.success === true)) {
        this.metaData = data.data;
        this.saveMetaDataToLocalStorage()
      }
    }, error => {
      alert(error.error.text)
      console.dir(error.error.text)
      return;
    });
  }

  private saveMetaDataToLocalStorage() {
    let date = parseInt((new Date().getTime() / 1000).toFixed(0))
    localStorage.setItem("metadata", JSON.stringify([this.metaData, date]))
  }

  private saveMetaToModel(model: any) {
    this.metaData = new BookMetaData(model)
  }
}
