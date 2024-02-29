import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cash-payment',
  templateUrl: './cash-payment.component.html',
  styleUrls: ['./cash-payment.component.css'],
})
export class CashPaymentComponent {
  constructor(
    private _CartService: CartService,
    private _ActivatedRoute: ActivatedRoute,
    private _FormBuilder: FormBuilder,
    private _Router: Router
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
      .checkOutSessionCash(this.currentId, this.userAddress.value)
      .subscribe({
        next: (response) => {
          this._Router.navigate(['/allorders']);
          this.loading = false;
        },
      });
  }
}
