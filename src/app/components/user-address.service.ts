import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAddressService {
  constructor(private _HttpClient: HttpClient) {}

  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/addresses';
  userToken: any = { headers: { token: localStorage.getItem('userToken') } };
  getUserAddress(): Observable<any> {
    return this._HttpClient.get(this.baseUrl, this.userToken);
  }

  addNewAddress(userAddress: {}): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/addresses`,
      userAddress,
      this.userToken
    );
  }
  getSpecificAddress(addressId: string): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
      this.userToken
    );
  }
  removeUserAddress(addressId: string): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
      this.userToken
    );
  }
  updateUserAddress(addressDetails: {}, addressId: string): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
      addressDetails,
      this.userToken
    );
  }
}
