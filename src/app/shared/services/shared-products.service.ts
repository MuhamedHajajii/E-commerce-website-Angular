import { Injectable } from '@angular/core';
import { Allproducts } from '../interfaces/allproducts';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SharedProductsService {
  constructor(private _Router: Router) {}

  sharedData: BehaviorSubject<Allproducts[]> = new BehaviorSubject<
    Allproducts[]
  >([]);
  ShareResult: Observable<Allproducts[]> = this.sharedData.asObservable();

  setSearchData(searched: Allproducts[]): void {
    this.sharedData.next(searched);
  }

  currentProducts: Allproducts[] = [];
}
