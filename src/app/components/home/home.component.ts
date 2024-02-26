import { Allproducts } from './../../shared/interfaces/allproducts';
import { OffersService } from './../../shared/services/offers.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetHomeproductsService } from 'src/app/shared/services/get-homeproducts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private _GetHomeproductsService: GetHomeproductsService,
    private _OffersService: OffersService
  ) {}
  homeProducts!: Allproducts[];
  dataindex: number = 1;
  callApi!: Subscription;
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
}
