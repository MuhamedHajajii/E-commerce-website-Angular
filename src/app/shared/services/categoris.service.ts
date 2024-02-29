import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategorisService {
  constructor(private _HttpClient: HttpClient) {}

  getSpecificCategory(category: string | null): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${category}`
    );
  }
  getAllCategories(): Observable<any> {
    return this._HttpClient.get(
      'https://ecommerce.routemisr.com/api/v1/categories'
    );
  }
  getAllSubCategories(): Observable<any> {
    return this._HttpClient.get(
      'https://route-ecommerce.onrender.com/api/v1/subcategories'
    );
  }
}
