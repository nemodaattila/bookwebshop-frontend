import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {FormService} from "../../../services/helper/form.service";
import {AuthenticationService} from "../../../services/authentication/authentication.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private router: Router, private formService: FormService, private authService: AuthenticationService) { }

  /**
   * login form
   */
  userLoginForm!: FormGroup;
  errorMessage = '';
  eventSubscription = Subscription.EMPTY;
  formErrorMessages = {
    name: {required : 'Név megadása kötelező'},
    password: {required: 'Jelszót kötelező kitölteni',minlength: 'A jelszónak minimum 8 karakternek kell lennie'}
  };


  /**
   * ha már be van jelentkezve valaki elnavigál
   * feliratkozás loginHiba triggerre
   */
  ngOnInit(): void {
    // if (this.userService.getLoggedUserBoolean()) { this.router.navigate(['/']); }
    this.initFormGroup();
    this.eventSubscription = this.authService.eventListener.subscribe(value => {
      if (value.type === 'loginError') {
        this.errorMessage = value.value;
      }
      if (value.type === 'loginOutError') {
        this.errorMessage = value.value;
      }
    });
  }

  /**
   * visszanavigálás
   */
  cancelForm(): void {
    this.router.navigate(['']);
  }

  /**
   * login form megjelenítése
   * @private
   */
  private initFormGroup(): void {
    this.userLoginForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required,Validators.minLength(8)])
    });
  }

  /**
   * form validéálás , elküldés feldolgozásra
   */
  submitLoginForm(): void {
    this.errorMessage = '';
    const formValid = this.formService.checkFormError(this.userLoginForm, this.formErrorMessages);
    if (formValid !== '')
    {
      this.errorMessage = formValid;
      return;
    }
    const data = this.userLoginForm.value;
    console.log(data)

    this.authService.login(data);
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

}
