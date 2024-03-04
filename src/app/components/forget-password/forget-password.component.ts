import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgetPasswordService } from 'src/app/shared/services/forget-password.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  constructor(
    private _ForgetPasswordService: ForgetPasswordService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}

  userEmail: string = '';
  isLoading: boolean = false;
  isLoading2: boolean = false;
  isLoading3: boolean = false;
  emailValid!: string;
  codeValid!: string;
  emailValidBoolean!: boolean | undefined;
  emailValidBoolean2!: boolean | undefined;
  lastForm: boolean = true;
  emailStuts: boolean = false;
  showLI: boolean = false;
  codeConfirmed: boolean = false;
  showLI2: boolean = false;

  sendEmailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  sendEmailtoVerify(): void {
    this.isLoading = true;
    this.emailValidBoolean = false;
    this._ForgetPasswordService
      .sendUserEmail(this.sendEmailForm.value)
      .subscribe({
        next: (response) => {
          if (response.statusMsg == 'success') {
            this.emailValid = response.message;
            this.emailValidBoolean = true;

            this.userEmail = this.sendEmailForm.get('email')?.value;
            setTimeout(() => {
              this.emailStuts = response.statusMsg;
              this.emailStuts = true;
              this.showLI = true;
            }, 1500);
          }
        },
        error: (response) => {
          this.isLoading = false;
          if (response.status == 404) {
            this.emailValidBoolean = false;
            this.emailValid = response.error.message;
          }
        },
      });
  }
  sendTimeOut!: number;
  sendTimeOutFlag: boolean = false;
  sendCodeAgain(): void {
    this.sendEmailForm.get('email')?.setValue(this.userEmail);
    this._ForgetPasswordService
      .sendUserEmail(this.sendEmailForm.value)
      .subscribe({
        next: (response) => {
          let i = 30;
          this.sendTimeOutFlag = true;
          this.sendTimeOut = i;
          let interval = setInterval(() => {
            this.sendTimeOut = --i;
            if (i == 0) {
              clearInterval(interval);
              this.sendTimeOutFlag = false;
            }
          }, 1000);
          this._ToastrService.show('Code Sent Again try Again After 30 sec');
        },
      });
  }

  userVerifyCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{5,6}$/),
    ]),
  });

  sendUserVirefyCode(): void {
    this.isLoading2 = true;
    this._ForgetPasswordService
      .sendUserVerifyCode(this.userVerifyCodeForm.value)
      .subscribe({
        next: (response) => {
          this.emailValidBoolean2 = true;
          this.codeValid = 'Email Confirmed';
          setTimeout(() => {
            this.codeConfirmed = true;
            this.lastForm = false;
          }, 1500);
        },
        error: (error) => {
          if (error.error.statusMsg == 'fail') {
            this.emailValidBoolean2 = false;
            this.codeValid = error.error.message;
          }
          this.isLoading2 = false;
        },
      });
  }

  newPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(this.userEmail),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/),
    ]),
  });

  repasswordAlert: boolean = false;
  success: boolean = true;

  sendNewPassword(): void {
    this.isLoading3 = true;
    this.newPasswordForm.get('email')?.setValue(this.userEmail);

    this._ForgetPasswordService
      .sendUserNewPassword(this.newPasswordForm.value)
      .subscribe({
        next: (response) => {
          this.success = false;
          setTimeout(() => {
            this._Router.navigate(['/login']);
          }, 3000);
        },
        error: (response) => {
          this.isLoading3 = false;
        },
      });
  }
  validitonPassword(Password: HTMLInputElement, rePassword: HTMLInputElement) {
    if (Password.value == rePassword.value) {
      this.repasswordAlert = true;
    } else {
      this.repasswordAlert = false;
    }
  }
}
