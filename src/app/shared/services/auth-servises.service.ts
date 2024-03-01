import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServisesService {
  constructor(private _HttpClient: HttpClient) {
    this.GetUserToken();
  }
  userdata: any;
  userId: string = '';
  GetUserToken(): void {
    if (localStorage.getItem('userToken') != null) {
      let encode: any = localStorage.getItem('userToken');
      let Decode = jwtDecode(encode);
      this.userdata = Decode;
      this.userId = this.userdata.id;
    }
  }

  sendUserData(userData: any): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      userData
    );
  }
  logInUser(userData: any): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      userData
    );
  }
}
