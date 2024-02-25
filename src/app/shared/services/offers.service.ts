import { Injectable } from '@angular/core';
import { Allproducts } from '../interfaces/allproducts';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  constructor() {}
  getOffer(i: number, items: Allproducts[], gategory?: string): string {
    if (items[i].category.name == 'Music') {
      return '13%';
    } else if (items[i].category.name == "Men's Fashion") {
      return '50%';
    } else if (items[i].category.name == "Women's Fashion") {
      return '10%';
    } else if (items[i].category.name == 'SuperMarket') {
      return '5%';
    } else if (items[i].category.name == 'Home') {
      return '7%';
    } else if (items[i].category.name == 'Books') {
      return '30%';
    } else if (items[i].category.name == 'Mobiles') {
      return '70%';
    } else if (items[i].category.name == 'Electronics') {
      return '14%';
    } else if (items[i].category.name == 'Baby & Toys') {
      return '17%';
    } else if (items[i].category.name == 'Beauty & Health') {
      return '55%';
    } else {
      return '1%';
    }
  }
}
