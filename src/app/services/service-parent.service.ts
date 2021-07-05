import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
/**
 * parent for services
 */
export class ServiceParentService {

  /**
   * the url of the backend server
   * @protected
   */
  protected backendUrl: string = "http://localhost:80/BookWebShopBackend/";

  public getBackendUrl():string
  {
    return this.backendUrl
  }

}
