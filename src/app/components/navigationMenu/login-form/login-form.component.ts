import {Component, OnDestroy, OnInit} from '@angular/core';
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
/**
 * component displaying and handling user login
 */
export class LoginFormComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private formService: FormService, private authService: AuthenticationService) {
  }

  /**
   * login form
   */
  userLoginForm!: FormGroup;

  /**
   * displayed error message in case of error
   */
  errorMessage = '';

  /**
   * subscription for events (error events)
   */
  eventSubscription = Subscription.EMPTY;

  /**
   * possible error messages connected to  form validation
   */
  formErrorMessages = {
    name: {required: 'Név megadása kötelező'},
    password: {required: 'Jelszót kötelező kitölteni', minlength: 'A jelszónak minimum 8 karakternek kell lennie'}
  };

  /**
   * form initialization and error subscribing
   */
  ngOnInit(): void {
    this.initFormGroup();
    this.eventSubscription = this.authService.httpEventListener.subscribe(value => {
      if (value.type === 'loginError') {
        this.errorMessage = value.value;
      }
      if (value.type === 'loginOutError') {
        this.errorMessage = value.value;
      }
    });
  }

  /**
   * form initialization
   * @private
   */
  private initFormGroup(): void {
    this.userLoginForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  /**
   * form validation, data passes to authorization service
   */
  submitLoginForm(): void {
    this.errorMessage = '';
    const formValid = this.formService.checkFormError(this.userLoginForm, this.formErrorMessages);
    if (formValid !== '') {
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
