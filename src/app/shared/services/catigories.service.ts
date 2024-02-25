import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatigoriesService {
  constructor(private _HttpClient: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this._HttpClient.get(
      'https://route-ecommerce.onrender.com/api/v1/categories'
    );
  }
}
