import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthServisesService } from './auth-servises.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private _HttpClient: HttpClient,
    private _AuthServisesService: AuthServisesService
  ) {}
  totalCartItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  changeCartCound: Observable<number> = this.totalCartItems.asObservable();
  updateCartCound(newNumber: number): void {
    this.totalCartItems.next(newNumber);
  }

  userToken: any = localStorage.getItem('userToken');
  userId: any = '';
  addToCart(productId: string): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',

      { productId: productId },
      { headers: { token: this.userToken } }
    );
  }
  getCurrentUserCart(): Observable<any> {
    return this._HttpClient.get(
      'https://ecommerce.routemisr.com/api/v1/cart',

      { headers: { token: this.userToken } }
    );
  }
  removeCartItem(productId: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { headers: { token: this.userToken } }
    );
  }
  updateQuantity(prodductId: string, countNumber: number): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${prodductId}`,
      { count: countNumber },
      { headers: { token: this.userToken } }
    );
  }
  clearCart(): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: { token: this.userToken },
      }
    );
  }
  checkOutSession(userCartId: string | null, userAddress: {}): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${userCartId}?url=http://localhost:4200`,
      { shippingAddress: userAddress },
      { headers: { token: this.userToken } }
    );
  }
  checkOutSessionCash(
    userCartId: string | null,
    userAddress: {}
  ): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${userCartId}`,
      { shippingAddress: userAddress },
      { headers: { token: this.userToken } }
    );
  }
}
