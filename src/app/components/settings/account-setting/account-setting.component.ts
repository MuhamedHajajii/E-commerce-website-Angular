import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import { UserDetails } from '../user-details';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css'],
})
export class AccountSettingComponent implements OnInit {
  constructor(private _UserDetailsService: UserDetailsService) {}

  currentUserDetails!: UserDetails;
  editMood: boolean = false;
  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    this._UserDetailsService.getCurrentUserData().subscribe({
      next: (response) => {
        this.currentUserDetails = response.data;
        this.setUserDataInInputs();
      },
    });
  }
  StartEdit(): void {
    this.editMood = true;
  }
  EndtEdit(): void {
    this.editMood = false;
    this.getUserDetails();
  }

  userUpdateDateForm: FormGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
  });

  setUserDataInInputs(): void {
    this.userUpdateDateForm.get('name')?.setValue(this.currentUserDetails.name);
    this.userUpdateDateForm
      .get('email')
      ?.setValue(this.currentUserDetails.email);
    this.userUpdateDateForm
      .get('phone')
      ?.setValue(this.currentUserDetails.phone);
  }

  UpdateData(): void {
    this._UserDetailsService
      .UpdateUserData(this.userUpdateDateForm.value)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.getUserDetails();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
