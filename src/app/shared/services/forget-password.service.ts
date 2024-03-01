import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgetPasswordService {
  constructor(private _HttpClient: HttpClient) {}
  baseUrl: string = `https://ecommerce.routemisr.com/api/v1/auth/`;
  sendUserEmail(userEmail: {}): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'forgotPasswords', userEmail);
  }
  sendUserVerifyCode(userCode: {}): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'verifyResetCode', userCode);
  }
  sendUserNewPassword(userCode: {}): Observable<any> {
    return this._HttpClient.put(this.baseUrl + 'resetPassword', userCode);
  }
}
