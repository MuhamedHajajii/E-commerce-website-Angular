import { GetHomeproductsService } from './../../../shared/services/get-homeproducts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Allproducts } from 'src/app/shared/interfaces/allproducts';
import { SpecificBrand } from 'src/app/shared/interfaces/specific-brand';
import { Successadd } from 'src/app/shared/interfaces/successadd';
import { BrandsService } from 'src/app/shared/services/brands.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { OffersService } from 'src/app/shared/services/offers.service';
import { SharedProductsService } from 'src/app/shared/services/shared-products.service';

@Component({
  selector: 'app-specific-brand',
  templateUrl: './specific-brand.component.html',
  styleUrls: ['./specific-brand.component.css'],
})
export class SpecificBrandComponent {
  brandDetails!: SpecificBrand;
  categoryProducts!: Allproducts[];

  changeDisplay: boolean = true;
  searchTitle: string = '';
  dataindex: number = 1;
  productsLoaded: boolean = true;
  searchArray: Allproducts[] = [];
  BrandId!: string | null;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _BrandsService: BrandsService,
    private _OffersService: OffersService,
    private _SharedProductsService: SharedProductsService,
    private _Router: Router,
    private _CartService: CartService,
    private _GetHomeproductsService: GetHomeproductsService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategoryIDFromRoute();
  }

  getCategoryIDFromRoute(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (response) => {
        this.BrandId = response.get('id');
        this.getSpecificBrand(this.BrandId);
      },
    });
  }

  getSpecificBrand(BrandId: string | null): void {
    this._BrandsService.getSpecificBrand(BrandId).subscribe({
      next: (response) => {
        this.brandDetails = response.data;
        this.getCategoryProducts();
        this.productsLoaded = false;
      },
    });
  }
  getCategoryProducts(): void {
    this._GetHomeproductsService.gitHomeProducts().subscribe({
      next: (response) => {
        let Allproducts: Allproducts[] = response.data;
        let categoryProducts: Allproducts[] = [];
        Allproducts.forEach((product) => {
          if (product.brand.name == this.brandDetails.name) {
            categoryProducts.push(product);
          }
        });
        this.categoryProducts = categoryProducts;
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
  searchReasult(searchvalue: string): void {
    this.searchArray = this.categoryProducts.filter((curentProduct) =>
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
