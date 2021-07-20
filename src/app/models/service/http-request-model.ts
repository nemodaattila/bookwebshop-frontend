import {HttpHeaders} from "@angular/common/http";

export class HttpRequestModel {



  private targetUrl?:string;

  private headers: HttpHeaders = new HttpHeaders()

  private requestType: string= 'GET';

  private parameters: {[index: string]: any} = {}

  setParameters(params: {[index: string]: string})
  {
    this.parameters = params;
  }

  getParameters(): {[index: string]: any}
  {
    return this.parameters;
  }

  setTargetUrl(targetUrl: string)
  {
    this.targetUrl = targetUrl;
  }

  getTargetUrl(): string
  {
    return this.targetUrl as string;
  }

  setRequestType(type: string)
  {
    type = type.toUpperCase();
    if ((['GET','POST','PUT','DELETE','OPTIONS'].findIndex(value => value === type))===-1)
    {
      throw new Error('request type is not right')
    }
    this.requestType= type
  }

  getRequestType()
  {
    return this.requestType;
  }

  addHeaders(headers: { [index: string]: string  }, reset: boolean = false)
  {
    if (reset)
      this.headers = new HttpHeaders()
    for (let key of Object.keys(headers))
    {
      console.log(key)
      console.log(headers[key])
      this.headers = this.headers.append(key,headers[key]);
    }
    console.log(this.headers)
  }

  getHeaders(): HttpHeaders
  {
    return this.headers;
  }
}
