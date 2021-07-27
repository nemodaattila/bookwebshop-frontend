import { Injectable } from '@angular/core';
import {User} from "../../models/user/user";

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  /**
   * data about logged user if exists, else null
   * @private
   */
  private loggedUser?: User = undefined



  /**
   * returns logged User
   * @return User
   */
  public getLoggedUser(): User | undefined {
    return this.loggedUser
  }

  constructor() { }

  /**
   * "frontend logout"
   * removes authorization token from localstorage
   * deletes loggedUser variable
   */
  public removeLoggedUserAndToken() {
    localStorage.removeItem('token')
    this.loggedUser = undefined
  }



  /**
   * saves user as loggedUser, emits state
   * @param user logged User
   */
  setLoggedUser(user: User) {
    this.loggedUser = user
    console.log(this.loggedUser)
  }

  /**
   * save authorization token to localstorage
   * @param token token string
   */
  saveToken(token: string) {
    localStorage.setItem('token', token)

  }

  /**
   * reads authorization token form localstorage
   */
  public getToken() {
    return localStorage.getItem('token')
  }

  /**
   * checks if valid token exists in localstorage
   * @private
   */
  public checkLocalStorageForToken(): boolean {
    // this.removeLoggedUserAndToken()
    return (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined)
  }

  /**
   * emits the state of logged user
   * true of a logged user exists
   * @private
   */

  public getLoggedUserState(): boolean
  {
    return this.loggedUser !== undefined
  }

}
