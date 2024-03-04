import { Component } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import { UserDetails } from '../user-details';
import { UserAddressService } from '../../user-address.service';
import { Address } from '../../address';
import {
  FormBuilder,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

interface specificAddress {
  data: {
    _id: string;
    name: string;
    details: string;
    phone: string;
    city: string;
  };
}

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent {
  constructor(
    private _UserAddressService: UserAddressService,
    private _FormBuilder: FormBuilder,
    private _ToastrService: ToastrService
  ) {}

  currentUserAddress!: Address;
  addAddressFlag: boolean = false;

  openAddAddress(): void {
    this.addAddressFlag = true;
    this.updateAddressFlag = false;

    this.emptyInputsAfterEdit();
  }
  closeAddAddress(): void {
    this.emptyInputsAfterEdit();
    this.addAddressFlag = false;
  }
  closeAddAddressPop(e: Event): void {
    e.stopPropagation();
  }
  ngOnInit(): void {
    this.getUserAddress();
  }

  getUserAddress(): void {
    this._UserAddressService.getUserAddress().subscribe({
      next: (response) => {
        this.currentUserAddress = response;
      },
    });
  }

  emptyInputsAfterEdit(): void {
    this.addressForm.get('name')?.enable();
    this.addressForm.reset();
  }

  addressForm: FormGroup = this._FormBuilder.group({
    name: ['', [Validators.required]],
    details: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    city: ['', [Validators.required]],
  });

  addNewAddress(): void {
    this._UserAddressService.addNewAddress(this.addressForm.value).subscribe({
      next: (response) => {
        this.currentUserAddress = response;
        this.addAddressFlag = false;
        this._ToastrService.show(
          'Address has been added successfully <i class="text-main fa-2x fa-solid fa-house-circle-check"></i>'
        );
      },
    });
  }
  updateAddressFlag: boolean = true;
  EditAddress(addressId: string): void {
    this.updateAddressFlag = true;
    this.addressId = addressId;
    this._UserAddressService.getSpecificAddress(addressId).subscribe({
      next: (response: specificAddress) => {
        this.addressForm.get('name')?.setValue(response.data.name);
        this.addressForm.get('name')?.disable();
        this.addressForm.get('details')?.setValue(response.data.details);
        this.addressForm.get('phone')?.setValue(response.data.phone);
        this.addressForm.get('city')?.setValue(response.data.city);
        this.addAddressFlag = true;
      },
    });
  }
  addressId: string = '';
  updateAddress(): void {
    this._UserAddressService
      .updateUserAddress(this.addressForm.value, this.addressId)
      .subscribe({
        next: (response) => {
          this.getUserAddress();
          this.emptyInputsAfterEdit();
          this._ToastrService.show(
            'Address has been Updated successfully <i class="text-main fa-2x fa-solid fa-house-circle-check"></i>'
          );
          this.closeAddAddress();
        },
      });
  }

  submuitType: string = '';

  onSubmit(): void {
    if (this.submuitType == 'add') {
      this.addNewAddress();
    } else if (this.submuitType == 'update') {
      this.updateAddress();
    }
  }

  addNewAddressFlag(type: string): void {
    this.submuitType = type;
  }
  updateNewAddressFlag(type: string): void {
    this.submuitType = type;
  }

  RemoveAddress(addressId: string): void {
    this._UserAddressService.removeUserAddress(addressId).subscribe({
      next: (response) => {
        this.getUserAddress();
        this._ToastrService.warning('Address has been Deleted');
      },
    });
  }
}
