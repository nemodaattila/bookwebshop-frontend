import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpRequestModel} from "../../models/service/http-request-model";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  private backendUrl: string = "http://localhost:80\\BookWebShopBackend\\";

  private requestType: string = 'GET';

  private parameters: Object ={}

  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  send(model: HttpRequestModel): Observable<any>|undefined
  {
    const rt = model.getRequestType()
     if (rt === 'GET')
     {
       return this.get(model)
     }
    if (rt === 'POST')
    {
      return this.post(model)
    }
     return undefined
  }




  public get(model: HttpRequestModel): Observable<any>
  {

    return this.http.get<any>(this.backendUrl+model.getTargetUrl());
  }

  public post(model: HttpRequestModel):Observable<any>
  {
    console.log(model)
    return this.http.post(this.backendUrl + model.getTargetUrl(), model.getParameters(), {headers: model.getHeaders()});
  }
}
