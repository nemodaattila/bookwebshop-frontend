import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {FormService} from "../../services/helper/form.service";
import {UserService} from "../../services/authentication/user.service";
import {GlobalMessageDisplayerService} from "../../services/helper/global-message-displayer.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userRegisterForm!: FormGroup;
  headerText = 'Regisztráció';
  formErrorMessages: { [index: string]: { [index: string]: string } } = {
    userName: {required: 'UNR'},
    email: {required: 'UER', email: 'UEV'},
    password: {required: 'UPR', minlength: 'UPML'},
    rePassword: {required: 'UPR', minlength: 'UPML'}
  };

  constructor(private router: Router, private userService: UserService,
              private messageService: GlobalMessageDisplayerService, private formValidator: FormService) {
  }

  /**
   * ha van bejelentkezett felhasnáló elnavigál
   * feliratkozás loginError-re
   */
  ngOnInit(): void {
    // if (this.coopServ.getLoggedUserBoolean()) { this.router.navigate(['/']); }
    this.initFormGroup();
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
      rePassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  /**
   * form navigálás, elküldés feldolgozásra
   */
  submitRegisterForm(): void {
    const formValid = this.formValidator.checkFormError(this.userRegisterForm, this.formErrorMessages);
    if (formValid !== '') {
      this.messageService.displayFail('URFV', formValid)
      return;
    }
    if (this.userRegisterForm.valid) {
      if (this.userRegisterForm.controls.password.value !== this.userRegisterForm.controls.rePassword.value) {
        this.messageService.displayFail('URFV', 'UPNE')
      } else {
        const data: { [index: string]: string } = this.userRegisterForm.value;
        delete data.rePassword;
        console.log(data)
        this.userService.register(data);
      }
    }
  }

}
