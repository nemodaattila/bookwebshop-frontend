import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormService} from "../../../services/helper/form.service";
import {UserService} from "../../../services/authentication/user.service";
import {GlobalMessageDisplayerService} from "../../../services/helper/global-message-displayer.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
/**
 * component displaying and handling user login
 */
export class LoginFormComponent implements OnInit {

  /**
   * login form
   */
  userLoginForm!: FormGroup;
  /**
   * possible error messages connected to  form validation
   */
  formErrorMessages = {
    name: {required: 'UNR'},
    password: {required: 'UPR', minlength: 'UPML'}
  };

  constructor(private router: Router, private formService: FormService, private userService: UserService,
              private messageServ: GlobalMessageDisplayerService) {
  }

  /**
   * form initialization and error subscribing
   */
  ngOnInit(): void {
    this.initFormGroup();
  }

  /**
   * form validation, data passes to authorization service
   */
  submitLoginForm(): void {
    const formValid = this.formService.checkFormError(this.userLoginForm, this.formErrorMessages);
    if (formValid !== '') {
      this.messageServ.displayFail('ULFV', formValid)
      return;
    }
    const data = this.userLoginForm.value;
    this.userService.login(data);
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

}
