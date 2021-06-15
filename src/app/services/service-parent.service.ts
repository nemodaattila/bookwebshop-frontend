import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceParentService {


  protected _backendUrl: string = 'http://localhost:3000';

  set backendUrl(value: string) {
    this._backendUrl = value;
  }

  constructor() { }
}
