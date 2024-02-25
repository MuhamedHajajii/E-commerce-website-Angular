import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetHomeproductsService {
  constructor(private _HttpClient: HttpClient) {}
  gitHomeProducts(): Observable<any> {
    return this._HttpClient.get(
      'https://ecommerce.routemisr.com/api/v1/products'
    );
  }
  getDetails(productID: any): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productID}`
    );
  }
}
