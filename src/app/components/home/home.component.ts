import { ToastrService } from 'ngx-toastr';
import { Allproducts } from './../../shared/interfaces/allproducts';
import { OffersService } from './../../shared/services/offers.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Successadd } from 'src/app/shared/interfaces/successadd';
import { CartService } from 'src/app/shared/services/cart.service';
import { GetHomeproductsService } from 'src/app/shared/services/get-homeproducts.service';
import { SharedProductsService } from 'src/app/shared/services/shared-products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private _GetHomeproductsService: GetHomeproductsService,
    private _OffersService: OffersService,
    private _SharedProductsService: SharedProductsService,
    private _Router: Router,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  changeDisplay: boolean = true;
  searchTitle: string = '';
  homeProducts!: Allproducts[];
  dataindex: number = 1;
  callApi!: Subscription;
  productsLoaded: boolean = true;
  ngOnInit(): void {
    this.getAllproducts();
  }
  ngOnDestroy(): void {
    this.callApi.unsubscribe();
  }
  getAllproducts(): void {
    this.callApi = this._GetHomeproductsService.gitHomeProducts().subscribe({
      next: (response) => {
        let allProductsResponse: Allproducts[] = response.data;
        let randomNumberArr: number[] = [];
        let displayRandomProducts: Allproducts[] = [];
        for (let i = 0; i < allProductsResponse.length; ) {
          let randomNumberGenerator: number = Math.floor(
            Math.random() * allProductsResponse.length
          );
          if (!randomNumberArr.includes(randomNumberGenerator)) {
            randomNumberArr.push(randomNumberGenerator);
            displayRandomProducts.push(
              allProductsResponse[randomNumberGenerator]
            );
            i++;
            this.homeProducts = displayRandomProducts;
          }
        }
        this._SharedProductsService.currentProducts = response.data;
        this.productsLoaded = false;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  currentIndex(i: number, lightBox: HTMLDivElement): void {
    lightBox.classList.remove('d-none');
    this.dataindex = i;
  }
  closeLightBox(lightBox: HTMLDivElement): void {
    lightBox.classList.add('d-none');
  }

  getOffer(i: number, items: Allproducts[]): number {
    return this._OffersService.getOffer(i, items);
  }
  changedisplayClicOne(): void {
    this.changeDisplay = true;
  }
  changedisplayClicTwo(): void {
    this.changeDisplay = false;
  }
  searchArray: Allproducts[] = [];
  searchReasult(searchvalue: string): void {
    this.searchArray = this.homeProducts.filter((curentProduct) =>
      curentProduct.title.toLowerCase().includes(searchvalue.toLowerCase())
    );
  }
  openSearchResult(): void {
    this._SharedProductsService.currentProducts = this.searchArray;
    if (this.searchArray.length > 0) {
      this._Router.navigate(['/search']);
    }
  }

  addToCart(_Id: string): void {
    this._CartService.addToCart(_Id).subscribe({
      next: (response: Successadd) => {
        let cartTotalProducts = 0;
        response.data.products.forEach((element) => {
          cartTotalProducts += element.count;
        });
        this._CartService.updateCartCound(cartTotalProducts);
        this._ToastrService.success(response.message);
      },
      error: (err) => {
        this._ToastrService.warning(err.error.message);
      },
    });
  }
}
