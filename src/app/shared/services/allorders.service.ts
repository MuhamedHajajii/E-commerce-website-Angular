import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AuthServisesService } from './auth-servises.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class AllordersService {
  constructor(
    private _HttpClient: HttpClient,
    private _AuthServisesService: AuthServisesService,
    private _CartService: CartService
  ) {}

  AllOrdersCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  changeOrdersCount: Observable<number> = this.AllOrdersCount.asObservable();

  changeTruckCount(NewNumber: number): void {
    this.AllOrdersCount.next(NewNumber);
  }

  getUserOrders(): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${this._AuthServisesService.userdata.id}`
    );
  }
  getSingleOrderDetails(_id: string | null): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/orders/${_id}`,
      { headers: { token: this._CartService.userToken } }
    );
  }
}
