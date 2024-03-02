import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServisesService } from 'src/app/shared/services/auth-servises.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private _AuthServisesService: AuthServisesService,
    private _Router: Router
  ) {}
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });
  IncorrectEmailorPassword: string = '';
  isLoading: boolean = false;
  submitRegister(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._AuthServisesService.logInUser(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            localStorage.setItem('userToken', response.token);
            this._AuthServisesService.GetUserToken();
            this._Router.navigate(['/home']);
            this.isLoading = false;
          }
        },
        error: (errorRespon) => {
          this.isLoading = false;
          console.log(errorRespon);
          this.IncorrectEmailorPassword = errorRespon.error.message;
          this.loginForm.get('email')?.setErrors({ userEmail: true });
          this.loginForm.get('password')?.setErrors({ userPassword: true });
        },
      });
    }
  }
}
