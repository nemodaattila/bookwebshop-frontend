import {Injectable} from '@angular/core';
import {User} from "../../models/user/user";

@Injectable({
  providedIn: 'root'
})
export class VariableHelperService {

  constructor() {
  }

  /**
   * converts an array to object
   * @param array
   */
  public static arrayToObjectWithIntKey(array: Array<any>): { [index: number]: any } {
    console.log(array)
    let obj: { [index: number]: any } = {}
    array.forEach((value, index) => {
      obj[index] = value
    });
    return obj;
  }

  public createUserFromHttpResponse(response: { [index: string]: any }) {
    console.log(response)
    let user = new User();
    user.setUserName(response['userName']);
    user.setEmail(response['email'])
    user.setAuthenticationLevel(response['authorizationLevel'])
    return user;

  }
}
