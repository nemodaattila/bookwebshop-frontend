import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {FormService} from "../../services/helper/form.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userRegisterForm!: FormGroup;
  errorMessage = '';
  headerText = 'Regisztráció';
  errorObs: Subscription = Subscription.EMPTY;
  formErrorMessages:{[index: string]: { [index: string] : string}} = {
    userName: {required : 'Felhasználónév megadása kötelező'},
    email: {required : 'Email megadása kötelező', email: 'Valid e-mail címet adjon meg!'},
    password: {required: 'Jelszót kötelező kitölteni', minlength: 'A jelszónak minimum 8 karakternek kell lennie'},
    rePassword: {required: 'Jelszót kötelező kitölteni', minlength: 'A jelszónak minimum 8 karakternek kell lennie'}
  };

  serverErrorMessages: {[index: string]:string}=
    {
      'UE': 'Már létezik felhasználó az adott névvel vagy e-mail címmel',
      "UCE": 'A felhasználó létrehozása szerver hiba miatt meghiúsult'
    }

  constructor(private router: Router, private authService: AuthenticationService, private formValidator: FormService) { }

  /**
   * ha van bejelentkezett felhasnáló elnavigál
   * feliratkozás loginError-re
   */
  ngOnInit(): void {
    // if (this.coopServ.getLoggedUserBoolean()) { this.router.navigate(['/']); }
    this.initFormGroup();
    this.errorObs = this.authService.eventListener.subscribe(value => {
      if (value.type === 'registerError') {
        this.errorMessage = this.serverErrorMessages[value.value];
      }
    });
  }

  /**
   * visszairányitás
   */
  cancelForm(): void {
    this.router.navigate(['']);
  }

  /**
   * form megjelenítés
   * @private
   */
  private initFormGroup(): void {
    this.userRegisterForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      rePassword: new FormControl('' , [Validators.required, Validators.minLength(8)])
    });
  }

  /**
   * form navigálás, elküldés feldolgozásra
   */
  submitRegisterForm(): void {
    this.errorMessage = '';
    const formValid = this.formValidator.checkFormError(this.userRegisterForm, this.formErrorMessages);
    if (formValid !== '')
    {
      this.errorMessage = formValid;
      return;
    }
    if (this.userRegisterForm.valid) {
      if (this.userRegisterForm.controls.password.value !== this.userRegisterForm.controls.rePassword.value) {
        this.errorMessage = 'A két jelszó nem egyezik';
      } else {
        const data: {[index: string]: string} = this.userRegisterForm.value;
        delete data.rePassword;
        console.log(data)
        this.authService.register(data);
      }
    }
  }

  ngOnDestroy(): void {
    this.errorObs.unsubscribe();
  }

}
