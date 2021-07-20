import { Injectable } from '@angular/core';
import {User} from "../../models/user/user";

@Injectable({
  providedIn: 'root'
})
export class VariableHelperService {

  constructor() { }

  public createUserFromHttpResponse(response: { [index: string]: any }) {
    console.log(response)
    let user = new User();
    user.setUserName(response['userName']);
    user.setEmail(response['email'])
    user.setAuthenticationLevel(response['authorizationLevel'])
    return user;

  }
}
