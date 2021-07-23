import {Injectable} from '@angular/core';
import {User} from "../../models/user/user";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {VariableHelperService} from "../helper/variable-helper.service";
import {Router} from "@angular/router";
import {backendUrl} from "../../globals";

@Injectable({
  providedIn: 'root'
})

/**
 * service for handling user authentication, login, logout, custom web token
 * communication with server, etc.
 */
export class AuthenticationService {

  /**
   * data about logged user if exists, else null
   * @private
   */
  private loggedUser?: User = undefined

  /**
   * emits the state of user , true if a user is logged in
   */
  public loggedUserState = new Subject<boolean>();

  httpEventListener = new Subject<any>();

  /**
   * checks if a user is saved in localstorage but not in loggedUser variable (e.g. browser refresh)
   * if true checks with the server if user is valid
   * TODO check: valid token check with server
   */
  constructor(private router: Router, private http: HttpClient, private varHelper: VariableHelperService) {
    console.log(this.checkLocalStorageForToken())
    console.log(this.getToken())
    if (this.checkLocalStorageForToken() && this.loggedUser === undefined) {
      this.getUserFromServerBasedOnToken(this.getToken()).subscribe((value => {
          console.log(value)
          if (!value['success']) {
            this.removeLoggedUserAndToken()
            this.httpEventListener.next({type: 'tokenError', value: value['data']['errorCode']});
          } else {
            this.loggedUser = this.varHelper.createUserFromHttpResponse(value['data']['userData'])
            console.log(this.loggedUser)
            this.emitLoggedUserState(true)
          }
        }),
        error => {
          console.log(error.error)
        }
      )
    }
  }

  /**
   * send a request to the server - user registration
   * no login on success
   * TODO : EMAIL confirmation or equivalent
   * @param regData: object - registration data
   */
  register(regData: { [index: string]: string }): void {
    this.registerRequest(regData).subscribe(value => {
      let {'success': success, 'data': data} = value

      if (success === true) {
        this.httpEventListener.next({type: 'registrationSuccess', value: true});
        this.router.navigate(['/']);
      } else {
        this.httpEventListener.next({type: 'registerError', value: data['errorCode']});
      }

    }, error => {
      this.httpEventListener.next({type: 'registerError', value: error.error});
    });
  }

  /**
   * sends request to the server - user login
   * @param data : object login data
   */

  login(data: { [index: string]: string }): void {
    this.loginRequest(data).subscribe(value => {
      console.log(value)
      console.log(value.cookie)
      let {'success': success, 'data': data} = value
      if (success) {
        console.log(data)
        this.setLoggedUser(this.varHelper.createUserFromHttpResponse(data['userData']))
        this.saveToken(data['token']);
      } else {
        this.httpEventListener.next({type: 'loginError', value: data['errorCode']});
      }
    }, error => {
      console.log(error)
      this.httpEventListener.next({type: 'loginError', value: error.error});
    });
  }

  /**
   * register http request
   * @param data register data
   */
  registerRequest(data: { [index: string]: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain',
    });
    return this.http.post<any>(backendUrl + 'register', data, {headers: headers});
  }

  /**
   * login http request
   * @param data login data
   */
  loginRequest(data: { [index: string]: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain',
    });
    return this.http.post<any>(backendUrl + 'login', data, {headers: headers});
  }

  /**
   * sends request to te server - user logout
   */
  logOut() {
    this.logOutRequest().subscribe((value) => {
        console.log(value)
        let {success, data} = value
        console.log([success, data])
        if (success === true) {
          this.removeLoggedUserAndToken()
        } else {
          console.log(value)
          this.httpEventListener.next({type: 'logOutError', value: data['errorCode']});
        }
      }
      , (error) => {
        console.log(error)
      })
  }

  /**
   * logout http request
   */
  logOutRequest() {
    return this.http.get<any>(backendUrl + 'logout');
  }

  /**
   * "frontend logout"
   * removes authorization token from localstorage
   * deletes loggedUser variable
   */
  public removeLoggedUserAndToken() {
    localStorage.removeItem('token')
    this.loggedUser = undefined
    this.emitLoggedUserState(false)

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
  getToken() {
    return localStorage.getItem('token')
  }

  /**
   * saves user as loggedUser, emits state
   * @param user logged User
   */
  setLoggedUser(user: User) {
    this.loggedUser = user
    this.emitLoggedUserState(true)
  }

  /**
   * returns logged User
   * @return User
   */
  public getLoggedUser(): User | undefined {
    return this.loggedUser
  }

  /**
   * http request for checking the logged user's validity
   * TODO rework token with credential
   * @param token
   */
  getUserFromServerBasedOnToken(token: string | null): Observable<any> {

    return this.http.get<any>(backendUrl + '\\tokentouser\\' + token);
  }

  /**
   * checks if valid token exists in localstorage
   * @private
   */
  private checkLocalStorageForToken(): boolean {
    // this.removeLoggedUserAndToken()
    return (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined)
  }

  /**
   * emits the state of logged user
   * true of a logged user exists
   * @param state true if user is logged
   * @private
   */
  private emitLoggedUserState(state: boolean) {
    this.loggedUserState.next(state)
  }
}
