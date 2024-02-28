import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Allproducts } from 'src/app/shared/interfaces/allproducts';
import { GetHomeproductsService } from 'src/app/shared/services/get-homeproducts.service';
import { OffersService } from 'src/app/shared/services/offers.service';
import { SharedProductsService } from 'src/app/shared/services/shared-products.service';

@Component({
  selector: 'app-main-search-bar',
  templateUrl: './main-search-bar.component.html',
  styleUrls: ['./main-search-bar.component.css'],
})
export class MainSearchBarComponent {
  constructor(
    private _GetHomeproductsService: GetHomeproductsService,
    private _OffersService: OffersService,
    private _SharedProductsService: SharedProductsService,
    private _Router: Router
  ) {}
  homeProducts!: Allproducts[];
  dataindex: number = 1;
  callApi!: Subscription;
  searchTitle: string = '';
  searchEmpty: boolean = true;
  searchArray: Allproducts[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.callApi = this._GetHomeproductsService.gitHomeProducts().subscribe({
      next: (respose) => {
        this.homeProducts = respose.data;
        this.searchEmpty = false;
      },
    });
  }

  ngOnDestroy(): void {
    console.log('bye');

    this.callApi.unsubscribe();
  }
  searchReasult(searchvalue: string): void {
    if (this.searchEmpty == false) {
      this.searchArray = this.homeProducts.filter((curentProduct) =>
        curentProduct.title.toLowerCase().includes(searchvalue.toLowerCase())
      );
      this._SharedProductsService.currentProducts = this.searchArray;
      this.onInitInputStatus = true;
    }
  }
  openSearchResult(searchMain: HTMLInputElement): void {
    this._SharedProductsService.currentProducts = this.searchArray;
    if (this.searchArray.length > 0) {
      this._Router.navigate(['/search']);
      this._SharedProductsService.setSearchData(this.searchArray);
      searchMain.value = '';
      this.onInitInputStatus = false;
    }
  }

  OnBlur(searchInputVal: HTMLInputElement): void {
    if (searchInputVal.value.length == 0) {
      this.onInitInputStatus = false;
      console.log('toz');
    } else {
      setTimeout(() => {
        this.onInitInputStatus = false;
      }, 500);
      console.log('toz2');
    }
  }
  onInitInputStatus: boolean = false;
  onFoucs(): void {
    this.onInitInputStatus = true;
  }
  getOffer(i: number, items: Allproducts[]): number {
    return this._OffersService.getOffer(i, items);
  }
}
