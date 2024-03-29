import { Component } from '@angular/core';
import {
  FormControl,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServisesService } from 'src/app/shared/services/auth-servises.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private _AuthServisesService: AuthServisesService,
    private _Router: Router
  ) {}
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,}$/),
      ]),
      rePassword: new FormControl(null),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: [this.confirmRePassword] } as FormControlOptions
  );

  confirmRePassword(form: FormGroup): void {
    let password = form.get('password');
    let rePassword = form.get('rePassword');

    if (rePassword?.value == null || rePassword?.value == '') {
      rePassword?.setErrors({ required: true });
    } else if (password?.value != rePassword?.value) {
      rePassword?.setErrors({ notMatch: true });
    }
  }

  userName: string = '';

  accountAreadyExistsMessage: string = '';
  isLoading: boolean = false;
  submitRegister(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthServisesService
        .sendUserData(this.registerForm.value)
        .subscribe({
          next: (response) => {
            if (response.message == 'success') {
              this.userName = response.user.name;
              this.finishChangePasswordFlag = true;
              this.isLoading = false;
            }
          },
          error: (errorRespon) => {
            if (errorRespon.error.message == 'Account Already Exists') {
              this.accountAreadyExistsMessage = errorRespon.error.message;
              this.registerForm
                .get('email')
                ?.setErrors({ accountAlreadyExsists: true });
            } else if (
              errorRespon.error.errors.msg ==
              'Password confirmation is incorrect'
            ) {
              this.accountAreadyExistsMessage =
                errorRespon.error.errors.msg + "( password doesn't match ! )";
              this.registerForm
                .get('password')
                ?.setErrors({ accountAlreadyExsists: true });
              this.registerForm
                .get('rePassword')
                ?.setErrors({ accountAlreadyExsists: true });
            }
            this.isLoading = false;
          },
        });
    }
  }

  finishChangePasswordFlag: boolean = false;
  finishChangePassword() {
    this._Router.navigate(['/login']);
  }
}
