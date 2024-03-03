import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetHomeproductsService {
  constructor(private _HttpClient: HttpClient) {}
  gitHomeProducts(pageNumber: number = 1): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${pageNumber}`
    );
  }
  getDetails(productID: any): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productID}`
    );
  }
}
