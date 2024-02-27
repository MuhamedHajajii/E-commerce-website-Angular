import { Injectable } from '@angular/core';
import { Allproducts } from '../interfaces/allproducts';

@Injectable({
  providedIn: 'root',
})
export class SharedProductsService {
  constructor() {}

  currentProducts: Allproducts[] = [];
}
