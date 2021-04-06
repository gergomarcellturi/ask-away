import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../api/service/auth.service";
import {Router} from "@angular/router";
import {cardFlip} from "../../api/animations/cardflip";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {emailFormatValidator, passwordMatchingValidation} from "../../api/validators/validators";
import {CommonService} from "../../api/service/common.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [cardFlip]
})
export class LoginComponent implements OnInit {

  flipped = false;
  loginForm: FormGroup;
  registrationForm: FormGroup;

  constructor(
    public auth: AuthService,
    public router: Router,
    public common: CommonService,
    public formBuilder: FormBuilder,
  ) {
    this.createLoginForm().then();
    this.createRegistrationForm().then();
  }

  ngOnInit(): void {
  }

  public flip = (): void => {
    this.flipped = !this.flipped;
  }

  public login = (): void => {
    if (this.loginForm.invalid) return;
    this.auth.emailSignIn(this.loginForm.get('email').value as string, this.loginForm.get('password').value  as string).then();
  }

  public register = (): void => {
    if (this.registrationForm.invalid) return;
    this.auth.emailSignUp(this.registrationForm.get('email').value as string, this.registrationForm.get('password').value as string)
      .then(result => console.log(result))
      .catch(error => console.log(this.common.openSnackbar(error.message)));
  }

  private createLoginForm = async (): Promise<void> => {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, emailFormatValidator]],

      password: ['', [Validators.required]]
    })
  }

  private createRegistrationForm = async (): Promise<void> => {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, emailFormatValidator]],

      password: ['', [Validators.required]],

      passwordRe: ['', Validators.required]
    }, {validators: passwordMatchingValidation})
  }
}
