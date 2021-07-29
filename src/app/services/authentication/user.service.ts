import {Injectable} from '@angular/core';
import {User} from "../../models/user/user";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {VariableHelperService} from "../helper/variable-helper.service";
import {Router} from "@angular/router";
import {backendUrl} from "../../globals";
import {LoggedUserService} from "./logged-user.service";
import {GlobalMessageDisplayerService} from "../helper/global-message-displayer.service";

@Injectable({
  providedIn: 'root'
})

/**
 * service for handling user authentication, login, logout, custom web token
 * communication with server, etc.
 */
export class UserService {

  /**
   * emits the state of user , true if a user is logged in
   */
  public loggedUserState = new Subject<boolean>();

  /**
   * checks if a user is saved in localstorage but not in loggedUser variable (e.g. browser refresh)
   * if true checks with the server if user is valid
   */
  constructor(private router: Router, private http: HttpClient, private varHelper: VariableHelperService,
              private loggedUserServ: LoggedUserService, private messageDisplayer: GlobalMessageDisplayerService) {
    if (this.loggedUserServ.checkLocalStorageForToken() && this.loggedUserServ.getLoggedUser() === undefined) {
      this.getUserFromServerBasedOnToken().subscribe(({'success': success, 'data': data}) => {
          if (!success) {
            this.loggedUserServ.removeLoggedUserAndToken()
            this.messageDisplayer.displayFail('UTC', data['errorCode'])
          } else {
            this.loggedUserServ.setLoggedUser(this.varHelper.createUserFromHttpResponse(data['userData']))
            this.messageDisplayer.displaySuccess('UTC', data['userData']['userName'])
          }
          this.emitLoggedUserState()
        },
        () => {
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
    this.registerRequest(regData).subscribe(({'success': success, 'data': data}) => {
      if (success === true) {
        this.messageDisplayer.displaySuccess('UR')
        void this.router.navigate(['/']);
      } else {
        this.messageDisplayer.displayFail('UR', data['errorCode'])
      }
    });
  }

  /**
   * sends request to the server - user login
   * @param data : object login data
   */
  login(data: { [index: string]: string }): void {
    this.loginRequest(data).subscribe(({'success': success, 'data': data}) => {
      if (success) {
        this.loggedUserServ.setLoggedUser(this.varHelper.createUserFromHttpResponse(data['userData']))
        this.loggedUserServ.saveToken(data['token']);
        this.messageDisplayer.displaySuccess('UL', data['userData']['userName'])
      } else {
        this.messageDisplayer.displayFail('UL', data['errorCode'])
      }
      this.emitLoggedUserState()
    });
    this.emitLoggedUserState()
  }

  /**
   * register http request
   * @param data register data
   */
  registerRequest(data: { [index: string]: string }): Observable<any> {
    return this.http.post<any>(backendUrl + 'register', data,
      {headers: new HttpHeaders({'Content-Type': 'text/plain',})}
    );
  }

  /**
   * login http request
   * @param data login data
   */
  loginRequest(data: { [index: string]: string }): Observable<any> {
    return this.http.post<any>(backendUrl + 'login', data,
      {headers: new HttpHeaders({'Content-Type': 'text/plain',})}
    );
  }

  /**
   * sends request to te server - user logout
   */
  logOut() {
    this.logOutRequest().subscribe(({'success': success, 'data': data}) => {
      if (success === true) {
        this.loggedUserServ.removeLoggedUserAndToken()
        this.messageDisplayer.displaySuccess('ULO')
      } else {
        this.messageDisplayer.displayFail('ULO', data['errorCode'])
      }
      this.emitLoggedUserState()
    }, () => {
      this.emitLoggedUserState()
    })

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

  public getTokenExpirationTime(): number {
    return this.loggedUserServ.getTokenExpiringTime()
  }

  /**
   * http request for checking the logged user's validity
   */
  getUserFromServerBasedOnToken(): Observable<any> {

    return this.http.get<any>(backendUrl + '\\tokentouser');
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
