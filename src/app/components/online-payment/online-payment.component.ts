import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-online-payment',
  templateUrl: './online-payment.component.html',
  styleUrls: ['./online-payment.component.css'],
})
export class OnlinePaymentComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _ActivatedRoute: ActivatedRoute,
    private _FormBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.getCurrentCurtId();
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
    this._CartService
      .checkOutSession(this.currentId, this.userAddress.value)
      .subscribe({
        next: (response) => {
          window.location.assign(response.session.url);
        },
      });
  }
}
