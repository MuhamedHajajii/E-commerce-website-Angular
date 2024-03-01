import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Allproducts } from 'src/app/shared/interfaces/allproducts';
import { Successadd } from 'src/app/shared/interfaces/successadd';
import { CartService } from 'src/app/shared/services/cart.service';
import { GetHomeproductsService } from 'src/app/shared/services/get-homeproducts.service';
import { OffersService } from 'src/app/shared/services/offers.service';
import { SharedProductsService } from 'src/app/shared/services/shared-products.service';
import { WishListService } from 'src/app/shared/services/wish-list.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  constructor(
    private _GetHomeproductsService: GetHomeproductsService,
    private _OffersService: OffersService,
    private _SharedProductsService: SharedProductsService,
    private _Router: Router,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishListService: WishListService
  ) {}
  changeDisplay: boolean = true;
  searchTitle: string = '';
  homeProducts!: Allproducts[];
  dataindex: number = 1;
  callApi!: Subscription;
  productsLoaded: boolean = true;
  currentWishList: string[] = [''];
  ngOnInit(): void {
    this.getAllproducts();
    this.getUserLogedWishList();
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
