import {ServiceParentService} from "./service-parent.service";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {BookMetaData} from "../models/book-meta-data";
import {Injectable, OnInit} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
/**
 * gets book meta data from server
 * notifies other component
 */
export class BookMetaDataService extends ServiceParentService implements OnInit {

  /**
   * model for storing metadata
   * @private
   */
  private metaData?: BookMetaData;

  /**
   * subject for notifying about the readiness of the metadata
   * triggers if metadata arrived from server
   * OR metadata loaded form localstorage
   */
  public metaDataReady = new Subject<BookMetaData>();

  /**
   * shows if metadata is loaded
   * @private
   */
  private readyState: boolean = false;

  constructor(private http: HttpClient) {
    super();
    // localStorage.setItem('metadata','');
    this.checkMetaDataInLocalStorage();
  }

  ngOnInit() {
    this.checkMetaDataInLocalStorage();
  }

  /**
   * returns the readiness og the meta data loading
   */
  public checkReadyState(): boolean {
    return this.readyState;
  }

  /**
   * checks if metadata exists in localstorage
   * if true ,checks it's date
   * if it's not older than one day, saves to model
   * in every other case
   * it's calls a http request function (getMetaDataFromServer)
   * @private
   */
  private checkMetaDataInLocalStorage() {
    let date;
    let metadata = localStorage.getItem('metadata');
    // metadata = null
    if (metadata) {
      [metadata, date] = JSON.parse(metadata);
      let actTime = parseInt((new Date().getTime() / 1000).toFixed(0))
      let metaDataTimeStamp = (actTime - date)
      if (metaDataTimeStamp > 3600000) {
        this.getMetaDataFromServer()
      } else
        this.saveMetaToModel(metadata)
      this.readyState = true
      this.metaDataReady.next(this.metaData);
    } else
      this.getMetaDataFromServer()
  }

  /**
   * sends a http request to the server, saves the result to the model, and
   * send a trigger to notify the components about it
   * @private
   */
  private getMetaDataFromServer() {
    this.http.get<any>(this.backendUrl + '\\metadata').subscribe(data => {
      if ((data.hasOwnProperty('success') && data.success === true)) {
        this.saveMetaToModel(data.data);
        this.saveMetaDataToLocalStorage()
        this.readyState = true;
        this.metaDataReady.next(this.metaData)
        console.log(this.metaData)
      }
    }, error => {
      console.dir(error.error.text)
      return;
    });
  }

  /**
   * saves the metadata model to localstorage
   * @private
   */
  private saveMetaDataToLocalStorage() {
    let date = parseInt((new Date().getTime() / 1000).toFixed(0))
    localStorage.setItem("metadata", JSON.stringify([this.metaData, date]))
  }

  /**
   * saves the metadata to a new BookMetaData model
   * @param data metadata
   * @private
   */
  private saveMetaToModel(data: any) {
    this.metaData = new BookMetaData(data)
  }

  /**
   * returns the type label based on id
   * @param id
   */
  public getTypeById(id: number): string {
    if (this.metaData !== undefined) {
      return this.metaData.getTypeById(id);
    }
    return '';
  }

  /**
   * returns all main and subcategories
   */
  public getCategories(){


    return {
      // @ts-ignore
      mainCategory: this.metaData.getMainCategory(),
      // @ts-ignore
      subCategory: this.metaData.getSubCategory()
    }
  }

  getFormats()
  {
    return {
      // @ts-ignore
      type: this.metaData.getType(),
      // @ts-ignore
      format: this.metaData.getFormat()
    }
  }
}
