import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { UserAddressService } from '../user-address.service';
import { ToastrService } from 'ngx-toastr';
import { AuthServisesService } from 'src/app/shared/services/auth-servises.service';
import { Address } from '../address';

@Component({
  selector: 'app-online-payment',
  templateUrl: './online-payment.component.html',
  styleUrls: ['./online-payment.component.css'],
})
export class OnlinePaymentComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _ActivatedRoute: ActivatedRoute,
    private _FormBuilder: FormBuilder,
    private _UserAddressService: UserAddressService,
    private _ToastrService: ToastrService,
    private _AuthServisesService: AuthServisesService
  ) {}
  ngOnInit(): void {
    this.getCurrentCurtId();
    this.getUserAddress();
  }

  userAddress: FormGroup = this._FormBuilder.group({
    details: ['', [Validators.required, Validators.minLength(10)]],
    phone: [
      '',
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
    city: ['', [Validators.required]],
  });

  currentId: string | null = '';
  loading: boolean = false;
  getCurrentCurtId(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (response) => {
        this.currentId = response.get('id');
      },
    });
  }

  confirmUserAddress(): void {
    this.loading = true;
    this.getUserName();
    this._CartService
      .checkOutSession(this.currentId, this.userAddress.value)
      .subscribe({
        next: (response) => {
          this._CartService.updateCartCound(0);
          window.location.assign(response.session.url);
        },
      });
  }
  currentUserAddress!: Address;

  getUserAddress(): void {
    this._UserAddressService.getUserAddress().subscribe({
      next: (response) => {
        this.currentUserAddress = response;
      },
    });
  }
  currentAddress(e: any): void {
    let selected = e.target.value;
    this.currentUserAddress.data.forEach((element) => {
      if (element._id == selected) {
        this.userAddress.get('details')?.setValue(element.details);
        this.userAddress.get('phone')?.setValue(element.phone);
        this.userAddress.get('city')?.setValue(element.city);
      }
    });
  }

  userName: string = '';
  getUserName(): void {
    this._AuthServisesService.userName.subscribe({
      next: (response) => {
        this.userName = response;
        this.addNewAddress(response);
      },
    });
  }

  addNewAddress(userName: string): void {
    let userDetails = this.userAddress.value;
    userDetails.name = userName + 'is Address';

    this._UserAddressService.addNewAddress(userDetails).subscribe({
      next: (response) => {
        this.currentUserAddress = response;
        this._ToastrService.show(
          'Order has been Done successfully <i class="text-main fa-2x fa-solid fa-house-circle-check"></i>'
        );
      },
    });
  }
}
