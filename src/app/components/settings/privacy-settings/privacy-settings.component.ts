import { Component } from '@angular/core';
import { UserDetails } from '../user-details';
import { UserDetailsService } from '../user-details.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-privacy-settings',
  templateUrl: './privacy-settings.component.html',
  styleUrls: ['./privacy-settings.component.css'],
})
export class PrivacySettingsComponent {
  constructor(private _UserDetailsService: UserDetailsService) {}

  currentUserDetails!: UserDetails;

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    this._UserDetailsService.getCurrentUserData().subscribe({
      next: (response) => {
        this.currentUserDetails = response.data;
        console.log(response);
        console.log(response.data);
      },
    });
  }
  display: boolean = false;
  changeDisplay(): void {
    this.display = true;
  }
  isLoading: boolean = false;

  loggedUseChangePassword: FormGroup = new FormGroup({
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
  });

  resetPassowrdLoggedUser(): void {
    this._UserDetailsService
      .updateLoggedUserPassword(this.loggedUseChangePassword.value)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
      });
  }
}
