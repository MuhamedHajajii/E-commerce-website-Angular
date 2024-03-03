import { Injectable } from '@angular/core';
import { Allproducts } from '../interfaces/allproducts';
import { Categories } from '../interfaces/categories';

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
  getOfferCategoris(items: any): number {
    if (items.name == 'Music') {
      return 3;
    } else if (items.name == "Men's Fashion") {
      return 7;
    } else if (items.name == "Women's Fashion") {
      return 9;
    } else if (items.name == 'SuperMarket') {
      return 3;
    } else if (items.name == 'Home') {
      return 6;
    } else if (items.name == 'Books') {
      return 2;
    } else if (items.name == 'Mobiles') {
      return 3;
    } else if (items.name == 'Electronics') {
      return 13;
    } else if (items.name == 'Baby & Toys') {
      return 11;
    } else if (items.name == 'Beauty & Health') {
      return 5;
    } else {
      return 1;
    }
  }
  getOfferCart(name: any): number {
    if (name == 'Music') {
      return 3;
    } else if (name == "Men's Fashion") {
      return 7;
    } else if (name == "Women's Fashion") {
      return 9;
    } else if (name == 'SuperMarket') {
      return 3;
    } else if (name == 'Home') {
      return 6;
    } else if (name == 'Books') {
      return 2;
    } else if (name == 'Mobiles') {
      return 3;
    } else if (name == 'Electronics') {
      return 13;
    } else if (name == 'Baby & Toys') {
      return 11;
    } else if (name == 'Beauty & Health') {
      return 5;
    } else {
      return 1;
    }
  }
}
