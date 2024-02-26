import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Allproducts } from 'src/app/shared/interfaces/allproducts';
import { ProductDetails } from 'src/app/shared/interfaces/product-details';
import { GetHomeproductsService } from 'src/app/shared/services/get-homeproducts.service';
import { OffersService } from 'src/app/shared/services/offers.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  productDetails: ProductDetails = {} as ProductDetails;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _GetHomeproductsService: GetHomeproductsService,
    private _OffersService: OffersService
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let productID = params.get('id');

        this._GetHomeproductsService.getDetails(productID).subscribe({
          next: (productDetails: ProductDetails) => {
            console.log((this.productDetails = productDetails));
          },
        });
      },
    });
  }
  changeMainPic(currentImage: any, change: HTMLImageElement): void {
    let first = change.getAttribute('src');
    let second = currentImage.getAttribute('src');
    currentImage.setAttribute('src', first);
    change.setAttribute('src', second);
  }
  getOffers(i: number, items: Allproducts[], categories: string): number {
    return this._OffersService.getOffer(i, items, categories);
  }
}
