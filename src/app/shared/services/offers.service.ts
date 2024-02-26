import { Injectable } from '@angular/core';
import { Allproducts } from '../interfaces/allproducts';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  constructor() {}
  getOffer(i: number, items: Allproducts[], gategory?: string): number {
    if (items[i].category.name == 'Music') {
      return 3;
    } else if (items[i].category.name == "Men's Fashion") {
      return 7;
    } else if (items[i].category.name == "Women's Fashion") {
      return 9;
    } else if (items[i].category.name == 'SuperMarket') {
      return 3;
    } else if (items[i].category.name == 'Home') {
      return 6;
    } else if (items[i].category.name == 'Books') {
      return 2;
    } else if (items[i].category.name == 'Mobiles') {
      return 3;
    } else if (items[i].category.name == 'Electronics') {
      return 13;
    } else if (items[i].category.name == 'Baby & Toys') {
      return 11;
    } else if (items[i].category.name == 'Beauty & Health') {
      return 5;
    } else {
      return 1;
    }
  }
}
