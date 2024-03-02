import { Component } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import { UserDetails } from '../user-details';
import { UserAddressService } from '../../user-address.service';
import { Address } from '../../address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent {
  constructor(private _UserAddressService: UserAddressService) {}

  currentUserAddress!: Address;

  ngOnInit(): void {
    this.getUserAddress();
  }

  getUserAddress(): void {
    this._UserAddressService.getUserAddress().subscribe({
      next: (response) => {
        this.currentUserAddress = response;
        console.log(response);
      },
    });
  }
}
