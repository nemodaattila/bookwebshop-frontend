import {Injectable, OnInit} from '@angular/core';
import {ServiceParentService} from "./service-parent.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookMetaDataService extends ServiceParentService implements OnInit {

  constructor(private http: HttpClient) {
    super();
    this.checkMetaDataInLocalStorage();
  }

  ngOnInit() {
    this.checkMetaDataInLocalStorage();
  }

  private checkMetaDataInLocalStorage() {
    const metadata = localStorage.getItem('metadata');
    if (metadata) {
      console.log('van')
    } else
      this.readBookMetaData().subscribe(value => {
        console.log(value)

      }, error => {
        console.dir(error)
      });
  }

  private readBookMetaData(): Observable<any> {
    console.log(this._backendUrl + '/metadata')
    return this.http.get<any>(this._backendUrl + '/metadata');
  }
}
