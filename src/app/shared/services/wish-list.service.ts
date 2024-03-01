import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Wishlist } from '../interfaces/wishlist';

@Injectable({
  providedIn: 'root',
})
export class WishListService implements OnInit {
  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/wishlist';
  wishListCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  changeWishList: Observable<number> = this.wishListCount.asObservable();
  changeHeartCount(wishListCount: number): void {
    this.wishListCount.next(wishListCount);
  }

  userWishList: BehaviorSubject<any> = new BehaviorSubject<any>('');
  currentWishList: Observable<any> = this.userWishList.asObservable();
  getCurrentUserWishList(userWishlist: Wishlist[]): void {
    this.userWishList.next(userWishlist);
  }

  constructor(
    private _HttpClient: HttpClient,
    private _CartService: CartService
  ) {}

  ngOnInit(): void {}

  addToWisthList(proucutId: string | null): Observable<any> {
    return this._HttpClient.post(
      this.baseUrl,
      {
        productId: proucutId,
      },
      { headers: { token: this._CartService.userToken } }
    );
  }

  getUserWishList(): Observable<any> {
    return this._HttpClient.get(this.baseUrl, {
      headers: { token: this._CartService.userToken },
    });
  }
  RemoveProductFromWishList(productId: string | null): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + '/' + productId, {
      headers: { token: this._CartService.userToken },
    });
  }
}
