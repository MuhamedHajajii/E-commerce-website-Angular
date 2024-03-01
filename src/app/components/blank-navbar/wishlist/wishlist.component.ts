import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Allproducts } from 'src/app/shared/interfaces/allproducts';
import { Successadd } from 'src/app/shared/interfaces/successadd';
import { Wishlist } from 'src/app/shared/interfaces/wishlist';
import { CartService } from 'src/app/shared/services/cart.service';
import { GetHomeproductsService } from 'src/app/shared/services/get-homeproducts.service';
import { OffersService } from 'src/app/shared/services/offers.service';
import { SharedProductsService } from 'src/app/shared/services/shared-products.service';
import { WishListService } from 'src/app/shared/services/wish-list.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  constructor(
    private _GetHomeproductsService: GetHomeproductsService,
    private _OffersService: OffersService,
    private _SharedProductsService: SharedProductsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishListService: WishListService
  ) {}
  changeDisplay: boolean = true;
  searchTitle: string = '';
  homeProducts!: Allproducts[];
  dataindex: number = 1;
  productsLoaded: boolean = true;
  searchArray: Allproducts[] = [];
  ngOnInit(): void {
    this.getAllproducts();
  }
  getAllproducts(): void {
    this._WishListService.getUserWishList().subscribe({
      next: (response: Wishlist) => {
        console.log(response.data);
        console.log(response.data.length);
        this._WishListService.changeHeartCount(response.data.length);
        this.homeProducts = response.data;

        this._SharedProductsService.currentProducts = response.data;
        this.productsLoaded = false;
      },
      error: (error) => {
        console.log(error);
      },
    });
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

  addToCart(_Id: string): void {
    this._CartService.addToCart(_Id).subscribe({
      next: (response) => {
        console.log(response);

        let cartTotalProducts = 0;
        response.data.products.forEach((element: any) => {
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
  // remove From Wish List
  removeFromWishList(productId: string | null): void {
    this._WishListService.RemoveProductFromWishList(productId).subscribe({
      next: (response) => {
        this.getAllproducts();
        this._ToastrService.warning(
          response.message + ` <i class="fa-solid fa-lg fa-trash"></i>`
        );
      },
    });
  }
}
