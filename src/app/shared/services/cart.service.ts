import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}
  totalCartItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  changeCartCound: Observable<number> = this.totalCartItems.asObservable();
  updateCartCound(newNumber: number): void {
    this.totalCartItems.next(newNumber);
    console.log(this.totalCartItems);
  }

  userToken: any = localStorage.getItem('userToken');

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
}
