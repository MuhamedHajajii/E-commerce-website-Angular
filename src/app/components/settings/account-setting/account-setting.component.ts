import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import { UserDetails } from '../user-details';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthServisesService } from 'src/app/shared/services/auth-servises.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css'],
})
export class AccountSettingComponent implements OnInit, OnDestroy {
  constructor(
    private _UserDetailsService: UserDetailsService,
    private _FormBuilder: FormBuilder,
    private _AuthServisesService: AuthServisesService,
    private _ToastrService:ToastrService
  ) {}
  currentUserDetails!: UserDetails;

  ngOnInit(): void {
    this.getUserDetails();
    this.disableInputs();
  }

  getUserDetails(): void {
    this._UserDetailsService.getCurrentUserData().subscribe({
      next: (response) => {
        this.currentUserDetails = response.data;

        this.setUserDataInInputs();
      },
    });
  }
  userUpdateDateForm: FormGroup = this._FormBuilder.group({
    name: [''],
    email: [''],
    phone: [''],
  });

  UpdateUserData(): void {
    this._UserDetailsService
      .UpdateUserData(this.userUpdateDateForm.value)
      .subscribe({
        next: (response) => {
          this.getUserDetails();
          this._AuthServisesService.userName.next(response.user.name);
          this._AuthServisesService.userdata.name = response.user.name;
          localStorage.setItem('userName', response.user.name);
          this._ToastrService.success('success')
          this.EndtEdit();
        },error:(res) => {
          this._ToastrService.error('E-mail already in use')
        }
      });
  }
  editing(): void {
    this.StartEdit();
    this._UserDetailsService.tipsandTricks().subscribe({
      next: (response) => {},
    });
  }

  // set Data In inputs
  setUserDataInInputs(): void {
    this.userUpdateDateForm.get('name')?.setValue(this.currentUserDetails.name);
    this.userUpdateDateForm
      .get('email')
      ?.setValue(this.currentUserDetails.email);
    this.userUpdateDateForm
      .get('phone')
      ?.setValue(this.currentUserDetails.phone);
  }
  // inputs disable and enable logic
  disableInputs(): void {
    this.userUpdateDateForm.get('name')?.disable();
    this.userUpdateDateForm.get('email')?.disable();
    this.userUpdateDateForm.get('phone')?.disable();
  }

  editMood: boolean = false;
  StartEdit(): void {
    this.editMood = true;
    this.userUpdateDateForm.get('name')?.enable();
    this.userUpdateDateForm.get('email')?.enable();
    this.userUpdateDateForm.get('phone')?.enable();
  }
  EndtEdit(): void {
    this.editMood = false;
    this.userUpdateDateForm.get('name')?.disable();
    this.userUpdateDateForm.get('email')?.disable();
    this.userUpdateDateForm.get('phone')?.disable();
  }
  ngOnDestroy(): void {
    if (this.editMood) {
      this.UpdateUserData();
    }
  }
}
