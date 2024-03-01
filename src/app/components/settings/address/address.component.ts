import { Component } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import { UserDetails } from '../user-details';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent {
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
