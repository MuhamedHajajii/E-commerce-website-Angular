import { Component } from '@angular/core';
import { UserDetails } from '../user-details';
import { UserDetailsService } from '../user-details.service';
import {
  FormControl,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthServisesService } from 'src/app/shared/services/auth-servises.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-settings',
  templateUrl: './privacy-settings.component.html',
  styleUrls: ['./privacy-settings.component.css'],
})
export class PrivacySettingsComponent {
  constructor(
    private _UserDetailsService: UserDetailsService,
    private _AuthServisesService: AuthServisesService,
    private _Router: Router
  ) {}

  currentUserDetails!: UserDetails;

  ngOnInit(): void {
    this.EndEditing();
  }

  isLoading: boolean = false;

  loggedUseChangePasswordForm: FormGroup = new FormGroup(
    {
      currentPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/),
      ]),
      rePassword: new FormControl(
        null,
        Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)
      ),
    },
    { validators: [this.matchPassword] } as FormControlOptions
  );

  // custom Validation
  incorrectPassword: boolean = false;
  incorrectError(input: HTMLInputElement) {
    this.incorrectPassword = false;
    input.classList.remove('is-invlaid');
  }
  matchPassword(form: FormGroup): void {
    let password = form.get('password');
    let rePassword = form.get('rePassword');

    if (rePassword?.value == null || rePassword?.value == '') {
      rePassword?.setErrors({ required: true });
    }
    if (password?.value != rePassword?.value) {
      rePassword?.setErrors({ notMatch: true });
    }
  }

  resetPassowrdLoggedUser(): void {
    this._UserDetailsService
      .updateLoggedUserPassword(this.loggedUseChangePasswordForm.value)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.EndEditing();
          this.finishChangePasswordFlag = true;
        },
        error: (err) => {
          console.log(err);
          this.incorrectPassword = true;
        },
      });
  }
  isEditing: boolean = true;
  startEdit(): void {
    this.isEditing = false;
    this.loggedUseChangePasswordForm.get('currentPassword')?.enable();
    this.loggedUseChangePasswordForm.get('password')?.enable();
    this.loggedUseChangePasswordForm.get('rePassword')?.enable();
  }
  EndEditing(): void {
    this.isEditing = true;
    this.loggedUseChangePasswordForm.get('currentPassword')?.disable();
    this.loggedUseChangePasswordForm.get('password')?.disable();
    this.loggedUseChangePasswordForm.get('rePassword')?.disable();
  }
  finishChangePasswordFlag: boolean = false;
  finishChangePassword() {
    localStorage.removeItem('userToken');
    this._Router.navigate(['/login']);
    window.location.reload();
  }
}
