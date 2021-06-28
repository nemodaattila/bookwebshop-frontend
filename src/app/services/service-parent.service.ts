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
  protected _backendUrl: string = "http://localhost:80/BookWebShopBackend/";
  
}
