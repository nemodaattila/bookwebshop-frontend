import {Injectable} from '@angular/core';
import {User} from "../../models/user/user";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {VariableHelperService} from "../helper/variable-helper.service";
import {Router} from "@angular/router";
import {backendUrl} from "../../globals";
import {LoggedUserService} from "./logged-user.service";

@Injectable({
  providedIn: 'root'
})

/**
 * service for handling user authentication, login, logout, custom web token
 * communication with server, etc.
 */
export class UserService {

  /**
   * data about logged user if exists, else null
   * @private
   */
  // private loggedUser?: User = undefined

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
  constructor(private router: Router, private http: HttpClient, private varHelper: VariableHelperService,
              private loggedUserServ: LoggedUserService) {
    console.log(this.loggedUserServ.checkLocalStorageForToken())
    console.log(this.loggedUserServ.getToken())
    if (this.loggedUserServ.checkLocalStorageForToken() && this.loggedUserServ.getLoggedUser() === undefined) {
      this.getUserFromServerBasedOnToken(this.loggedUserServ.getToken()).subscribe((value => {
          console.log(value)
          if (!value['success']) {
            this.loggedUserServ.removeLoggedUserAndToken()
            this.httpEventListener.next({type: 'tokenError', value: value['data']['errorCode']});
          } else {
            this.loggedUserServ.setLoggedUser(this.varHelper.createUserFromHttpResponse(value['data']['userData']))
          }
          this.emitLoggedUserState()
        }),
        error => {
          console.log(error.error)
          this.emitLoggedUserState()
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
        this.loggedUserServ.setLoggedUser(this.varHelper.createUserFromHttpResponse(data['userData']))
        this.loggedUserServ.saveToken(data['token']);
      } else {
        this.httpEventListener.next({type: 'loginError', value: data['errorCode']});
      }
      this.emitLoggedUserState()
    }, error => {
      console.log(error)
      this.httpEventListener.next({type: 'loginError', value: error.error});
    });
    this.emitLoggedUserState()

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
          this.loggedUserServ.removeLoggedUserAndToken()
        } else {
          console.log(value)
          this.httpEventListener.next({type: 'logOutError', value: data['errorCode']});
        }
        this.emitLoggedUserState()
      }, (error) => {
        console.log(error)
      })
    this.emitLoggedUserState()

  }

  /**
   * logout http request
   */
  logOutRequest() {
    return this.http.get<any>(backendUrl + 'logout');
  }

  /**
   * returns logged User
   * @return User
   */
  public getLoggedUser(): User | undefined {
    return this.loggedUserServ.getLoggedUser()
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
   * emits the state of logged user
   * true of a logged user exists
   * @private
   */
  private emitLoggedUserState() {
    this.loggedUserState.next(this.loggedUserServ.getLoggedUserState())
  }
}
