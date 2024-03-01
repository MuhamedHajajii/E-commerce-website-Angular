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
}
