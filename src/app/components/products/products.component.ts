import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
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
    private _WishListService: WishListService,
    private _Renderer2: Renderer2
  ) {}
  changeDisplay: boolean = true;
  searchTitle: string = '';
  homeProducts!: Allproducts[];
  allProducts!: Allproducts[];
  dataindex: number = 1;
  callApi!: Subscription;
  productsLoaded: boolean = true;
  currentWishList: string[] = [''];
  startNumber: number = 0;
  endNumber: number = 10;
  ProductsLength: number = 0;
  firstPageFlag: string = 'First';
  endThisButton: boolean = true;
  DisplayMoreData(): void {
    console.log(this.allProducts.length);
    this.endNumber += 10;
    if (this.endNumber > this.ProductsLength) {
      this.endNumber = this.ProductsLength;
    }
    if (this.allProducts.length == 0) {
      this.endThisButton = false;
    }
    if (this.firstPageFlag == 'First') {
      if (this.allProducts.length > 0) {
        this.getAllproducts();
      }
    }
  }

  getAllproducts(): void {
    this.callApi = this._GetHomeproductsService.gitHomeProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data;
        console.log(this.allProducts);
        this.ProductsLength = response.data.length;
        this.homeProducts = response.data.splice(
          this.startNumber,
          this.endNumber
        );
        this._SharedProductsService.currentProducts = response.data;
        this.productsLoaded = false;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.totalItems = response.results;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit(): void {
    this.getAllproducts();
    this.getUserLogedWishList();
  }
  ngOnDestroy(): void {
    this.callApi.unsubscribe();
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

  pageSize: number = 0;
  currentPage: number = 0;
  totalItems: number = 0;
  startPaginitionFlag: boolean = true;
  allproductsFromPagenition!: Allproducts[];
  endPage: boolean = true;
  DisplayMoreDataPages(response?: Allproducts[]): void {
    if (response) {
      this.homeProducts = response.splice(this.startNumber, this.endNumber);
    } else if (!response) {
      this.homeProducts = [
        ...this.homeProducts,
        ...this.allproductsFromPagenition.splice(0, 10),
      ];
    }
    if (this.allproductsFromPagenition.length == 0) {
      console.log('done');
      this.endPage = false;
    }

    console.log(this.allproductsFromPagenition.length);
  }
  pageChanged(e: any) {
    this.endPage = true;
    this.startPaginitionFlag = false;
    this.endNumber = 10;
    this.firstPageFlag = 'start Pagenetion';
    this.callApi = this._GetHomeproductsService.gitHomeProducts(e).subscribe({
      next: (response) => {
        this.allproductsFromPagenition = response.data;
        this.DisplayMoreDataPages(response.data);

        this._SharedProductsService.currentProducts = response.data;
        this.productsLoaded = false;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.totalItems = response.results;
        this.scrollTopBtn();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  scrollTopBtn(): void {
    scrollTo(0, 0);
  }
}
