import { Injectable } from '@angular/core';
import {User} from "../../models/user/user";
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {VariableHelperService} from "../helper/variable-helper.service";
import {Router} from "@angular/router";
import {HttpRequestService} from "../helper/http-request.service";
import {HttpRequestModel} from "../../models/service/http-request-model";



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{

  private loggedUser? :User=undefined

  public loggedUserState = new Subject<boolean>();

  eventListener = new Subject<any>();

  constructor(private router: Router, private http: HttpRequestService, private varHelper: VariableHelperService) {
    console.log(this.checkLocalStorageForToken())
    console.log(this.getToken())
    if (this.checkLocalStorageForToken() && this.loggedUser === undefined) {
      this.getUserFromServerBasedOnToken(this.getToken()).subscribe((value => {
          console.log(value)
        if (!value['success'])
        {
          if (value['data']['errorCode']==='UTEXP')
          {
            this.removeLoggedUserAndToken()
            console.log('user token timeout')

          }
        }
        else
        {
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

  register(regData: { [index: string]: string }): void {
    this.registerRequest(regData).subscribe(value => {
      let {'success': success, 'data': data} = value

      if (success === true) {
        this.eventListener.next({type: 'hasLoggedUser', value: true});
        this.router.navigate(['/']);
      } else {
        this.eventListener.next({type: 'registerError', value: data['errorCode']});
      }
      // localStorage.setItem('token', value.token);
      // this.authServ.setLoggedUser(value.token);
      // this.entryServ.readOwned(this.authServ.getLoggedUserID()).subscribe(value2 =>
      // {
      //   this.authServ.setOwnedEntries(value2);
      //   this.eventListener.next({type: 'setOwnedEntries', value: value2});
      // });

    }, error => {
      this.eventListener.next({type: 'registerError', value: error.error});
    });
  }

  login(data: any): void {
    this.loginRequest(data).subscribe(value => {
      let {'success': success, 'data': data} = value
      if (success) {
        console.log(data)
        this.setLoggedUser(this.varHelper.createUserFromHttpResponse(data['userData']))
        this.saveToken(data['token']);
      } else {
        this.eventListener.next({type: 'loginError', value: data['errorCode']});
      }
      // localStorage.setItem('token', value.token);
      // this.authServ.loginWithToken(value.token);
      // this.eventListener.next({type: 'hasLoggedUser', value: true});
      // this.entryServ.readOwned(this.authServ.getLoggedUserID()).subscribe((value2) =>
      // {
      //   this.authServ.setOwnedEntries(value2);
      //   this.eventListener.next({type: 'setOwnedEntries', value: value2});
      // });
      // this.router.navigate(['/']);
    }, error => {
      console.log(error)
      this.eventListener.next({type: 'loginError', value: error.error});
    });
  }

  registerRequest(data: { [index: string]: string }): Observable<any> {
   let hrm = new HttpRequestModel()
    hrm.addHeaders( {
      'Content-Type': 'text/plain',
    });
   hrm.setRequestType('POST')
    hrm.setTargetUrl('register')
    hrm.setParameters(data)
    return this.http.send(hrm) as Observable<any>
  }

  loginRequest(data: { [index: string]: string }): Observable<any> {
    let hrm = new HttpRequestModel()
    hrm.addHeaders( {
      'Content-Type': 'text/plain',
    });
    hrm.setRequestType('POST')
    hrm.setTargetUrl('login')
    hrm.setParameters(data)
    return this.http.send(hrm) as Observable<any>

  }

  logOut()
  {
    this.logOutRequest().subscribe((value)=>{
      console.log(value)
        let {success, data} = value
      console.log([success, data])
        if (success === true)
        {
          this.removeLoggedUserAndToken()
          console.log("logout success")
        }
        else
        {
          console.log(value)
          if (data['errorCode'] === 'UTINULL')
          {
            this.removeLoggedUserAndToken()
          }
          this.eventListener.next({type: 'logOutError', value: data['errorCode']});
        }
      }
      ,(error) =>
      {
        console.log(error)
      })
  }

  logOutRequest()
  {
    let hrm = new HttpRequestModel()
    // hrm.addHeaders( {
    //   'Content-Type': 'text/plain',
    // });
    hrm.setTargetUrl('logout\\'+this.getToken())
    // hrm.setParameters(data)
    return this.http.send(hrm) as Observable<any>

    // return this.http.get('logout\\'+this.getToken())
    // return this.http.get<any>(this.backendUrl + 'logout/'+this.getToken());
  }

  public removeLoggedUserAndToken()
  {
    localStorage.removeItem('token')
    this.loggedUser = undefined
    this.emitLoggedUserState(false)

  }

  saveToken(token: string)
  {
    localStorage.setItem('token', token)

  }

  getToken()
  {
    return localStorage.getItem('token')
  }

  setLoggedUser(user: User)
  {
    this.loggedUser = user
    this.emitLoggedUserState(true )
  }

  public getLoggedUser(): User |undefined
  {
    return this.loggedUser
  }



  getUserFromServerBasedOnToken(token: string | null): Observable<any> {
    let hrm = new HttpRequestModel()
    hrm.setTargetUrl('\\tokentouser\\'+token)
    return this.http.send(hrm) as Observable<any>
    // return this.http.get<any>(this.backendUrl + '\\tokentouser\\'+token);
  }

  private checkLocalStorageForToken(): boolean {
    // this.removeLoggedUserAndToken()
    return (localStorage.getItem('token') !== null && localStorage.getItem('token')!==undefined)
  }

  private emitLoggedUserState(state: boolean)
  {
    this.loggedUserState.next(state)
  }

  // /**
  //  * webToken kezelő
  //  */
  // public jwtHelper: JwtHelperService = new JwtHelperService();
  // /**
  //  * user be van e jelentkezve
  //  */
  // hasLoggedUser = false;
  // /**
  //  * a bejelentkezett user
  //  */
  // loggedUser: User = new User();
  // /**
  //  * a bejelentkezett user admnin-e
  //  */
  // isAdmin: boolean;
  // /**
  //  * a bejelentkezett user saját bejegyzései
  //  */
  // ownedEntries: Entry[] = [];
  // eventListener = new Subject<any>();
  //
  // constructor() {}
  //
  // /**
  //  * localstoragebol visszaadja a token nevű bejegyzést, egy JSON web tokent
  //  */
  // get token(): string
  // {
  //   return  localStorage.getItem('token');
  // }
  //
  // /**
  //  * visszaadja a bejelentkezett felhasnálót
  //  */
  // getLoggedUser(): User {
  //   return this.loggedUser;
  // }
  //
  // /**
  //  * visszaadja van-e bejelentkezve valaki
  //  */
  // public getLoggedUserBoolean(): boolean
  // {
  //   return this.hasLoggedUser;
  // }
  //
  // /**
  //  * visszaadja a bejelentkezett felhasználó id-ját
  //  */
  // getLoggedUserID(): string {
  //   return this.loggedUser._id;
  // }
  //
  // /**
  //  * a bejeletkezett felhasználót menti a webtokenből
  //  * @param token webtoken
  //  */
  // setLoggedUser(token): void {
  //   const user = this.createUserFromToken(token);
  //   this.hasLoggedUser = true;
  //   this.loggedUser._id = user._id;
  //   this.loggedUser.username = user.username;
  //   this.loggedUser.email = user.email;
  //   this.loggedUser.rank = user.rank;
  //   this.isAdmin = user.rank === 'admin';
  // }
  //
  // /**
  //  * az adott tokenből egy Usert kélszit
  //  * @param token webtokemn
  //  * @private
  //  */
  // private createUserFromToken(token: string): any {
  //   return this.jwtHelper.decodeToken(token);
  // }
  //
  // /**
  //  * a megadott userrel bejelentkeztet
  //  * @param token webtoken
  //  */
  // public loginWithToken(token): void
  // {
  //   this.setLoggedUser(token);
  // }
  //
  // /**
  //  * kilépteti a bejelentkezett felhasnálót
  //  */
  // logout(): void
  // {
  //   this.isAdmin = false;
  //   this.loggedUser = new User();
  //   this.hasLoggedUser = false;
  //   this.ownedEntries = [];
  // }
  //
  // /**
  //  * visszaadja a bejelentkezett felhasználó nevét
  //  */
  // getLoggedUsername(): string {
  //   return this.loggedUser.username;
  // }
  //
  // /**
  //  * visszaadja hogy a bejelentkezett felhasnáló admin-e
  //  */
  // getUserIsAdmin(): boolean {
  //   return (this.loggedUser.rank === 'admin' );
  // }
  //
  // /**
  //  * új entry hozzáadása
  //  * @param value a hozzáadandó elem
  //  */
  // unshiftOwnedEntry(value: Entry): void {
  //   this.ownedEntries.unshift(value);
  // }
  //
  // /**
  //  * ownedEntries beállítása
  //  * @param ownedEntries az entries
  //  */
  // setOwnedEntries(ownedEntries: Entry[]): void {
  //   this.ownedEntries = ownedEntries;
  // }
  //
  // /**
  //  * ownerEntries visszadása
  //  */
  // getOwnedEntries(): Entry[]
  // {
  //   return this.ownedEntries;
  // }
  //
  // /**
  //  * 1 ownedEntry visszadása
  //  * @param id az entry ID-je
  //  */
  // getOneOwnedEntry(id: any): Entry {
  //   const index = this.ownedEntries.findIndex(value => value._id === id);
  //   return this.ownedEntries[index];
  // }

}
