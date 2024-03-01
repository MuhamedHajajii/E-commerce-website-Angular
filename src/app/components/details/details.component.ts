import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Allproducts } from 'src/app/shared/interfaces/allproducts';
import { ProductDetails } from 'src/app/shared/interfaces/product-details';
import { Successadd } from 'src/app/shared/interfaces/successadd';
import { CartService } from 'src/app/shared/services/cart.service';
import { GetHomeproductsService } from 'src/app/shared/services/get-homeproducts.service';
import { OffersService } from 'src/app/shared/services/offers.service';
import { WishListService } from 'src/app/shared/services/wish-list.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  productDetails: ProductDetails = {} as ProductDetails;
  productID: any;
  currentoffer: number = 0;
  isLoading: boolean = true;
  currentWishList: string[] = [''];
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _GetHomeproductsService: GetHomeproductsService,
    private _OffersService: OffersService,
    private _ToastrService: ToastrService,
    private _CartService: CartService,
    private _WishListService: WishListService
  ) {}
  ngOnInit(): void {
    this.getUserLogedWishList();
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productID = params.get('id');
        this.displayDetails();
      },
    });
  }

  displayDetails(): void {
    this._GetHomeproductsService.getDetails(this.productID).subscribe({
      next: (productDetails: ProductDetails) => {
        this.productDetails = productDetails;
        this.currentoffer = this.getOffers(
          0,
          [this.productDetails.data],
          this.productDetails.data.category.name
        );
        this.isLoading = false;
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
  addToWishList(productId: string | null): void {
    this._WishListService.addToWisthList(productId).subscribe({
      next: (response) => {
        console.log(response.data);
        this.currentWishList = response.data;
        this._WishListService.changeHeartCount(response.data.length);
        this._ToastrService.success(
          response.message +
            `<i class="text-danger fa-solid fa-heart fa-lg"></i>`
        );
      },
    });
  }
  removeFromWishList(productId: string | null): void {
    this._WishListService.RemoveProductFromWishList(productId).subscribe({
      next: (response) => {
        this._WishListService.changeHeartCount(response.data.length);
        this.currentWishList = response.data;
        this._ToastrService.warning(
          response.message + ` <i class="fa-solid fa-lg fa-trash"></i>`
        );
      },
    });
  }
  getUserLogedWishList(): void {
    this._WishListService.currentWishList.subscribe({
      next: (response) => {
        if (response) {
          let wishList = response.data.map((product: any) => product._id);
          this.currentWishList = wishList;
        }
      },
    });
  }
}
