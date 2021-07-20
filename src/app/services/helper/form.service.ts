import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  checkFormError(form: FormGroup, errorTypes: {[index: string]: { [index: string] : string}}): string {
    let hasError = false;
    let formControl: string='';
    let error;
    for (const key in form.controls) {
      if (form.controls[key].errors !== null) {
        formControl = key;
        error = form.controls[key].errors;
        hasError = true;
        break;
      }
    }
    if (!hasError) {
      return '';
    } else {
      const errType = Object.getOwnPropertyNames(error)[0];
      if (errorTypes[formControl] !== undefined && errorTypes[formControl][errType] !== undefined) {
        return errorTypes[formControl][errType];
      } else {
        return 'ERROR: ' + formControl + ' ' + errType;
      }
    }
  }
}
