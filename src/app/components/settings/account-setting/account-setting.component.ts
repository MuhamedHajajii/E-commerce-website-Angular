import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import { UserDetails } from '../user-details';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css'],
})
export class AccountSettingComponent implements OnInit {
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
}
