import {Injectable} from '@angular/core';
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

  private tokenExpires: number = 600

  private loggedUserChecked: boolean = false

  setLoggedUserChecked(value: boolean) {
    this.loggedUserChecked = value;
  }

  public getLoggedUserChecked(): boolean {
    return this.loggedUserChecked;
  }

  /**
   * returns logged User
   * @return User
   */
  public getLoggedUser(): User | undefined {
    return this.loggedUser
  }

  constructor() {
  }

  /**
   * frontend logout
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
    return (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined)
  }

  /**
   * emits the state of logged user
   * true of a logged user exists
   * @private
   */

  public getLoggedUserState(): boolean {
    return this.loggedUser !== undefined
  }

  public setTokenExpiringTime(time: number) {
    this.tokenExpires = time - Math.floor(Date.now() / 1000)
  }

  public getTokenExpiringTime(): number {
    return this.tokenExpires;
  }

}
