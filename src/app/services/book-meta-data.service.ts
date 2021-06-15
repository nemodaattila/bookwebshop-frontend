import { Injectable } from '@angular/core';
import {ServiceParentService} from "./service-parent.service";

@Injectable({
  providedIn: 'root'
})
export class BookMetaDataService extends ServiceParentService{

  constructor() {
    super();

  }
}
