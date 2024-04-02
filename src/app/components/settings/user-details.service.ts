import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServisesService } from 'src/app/shared/services/auth-servises.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  constructor(
    private _HttpClient: HttpClient,
    private _AuthServisesService: AuthServisesService,
    private _CartService: CartService
  ) {}

  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/users/';

  getCurrentUserData(): Observable<any> {
    let userID = this._AuthServisesService.userId;
    console.log(userID);
    return this._HttpClient.get(`${this.baseUrl}${userID}`);
  }

  updateLoggedUserPassword(newPasswrod: object): Observable<any> {
    let userID = this._AuthServisesService.userId;
    return this._HttpClient.put(
      `${this.baseUrl}changeMyPassword`,
      newPasswrod,
      {
        headers: { token: this._CartService.userToken },
      }
    );
  }

  userToken: any = localStorage.getItem('userToken');

  UpdateUserData(userNewData: {}): Observable<any> {
    return this._HttpClient.put(
      'https://ecommerce.routemisr.com/api/v1/users/updateMe/',
      userNewData,
      { headers: { token: this.userToken } }
    );
  }

  // trick To make Api Change User Name and email and phoneNumber =D
  tipsandTricks(): Observable<any> {
    return this._HttpClient.put(
      'https://ecommerce.routemisr.com/api/v1/users/updateMe/',
      {
        name: 'TestTestTestTestTestTest',
        email: 'TestTestTestTesTestTestTesttTestTest@outlook.com',
        phone: '01010700700',
      },
      { headers: { token: this.userToken } }
    );
  }
}

/* 

{
        name: 'hajajii hajajii',
        email: 'hajajiihajajii@outlook.com',
        phone: '01002821454',
      }
{
        name: 'TestTestTest',
        email: 'TestTestTest@outlook.com',
        phone: '01234567890',
      }

*/
