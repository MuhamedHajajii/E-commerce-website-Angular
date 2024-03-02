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
}
