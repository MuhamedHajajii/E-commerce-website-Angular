import { GetHomeproductsService } from './../../../shared/services/get-homeproducts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Allproducts } from 'src/app/shared/interfaces/allproducts';
import { Specificcategorie } from 'src/app/shared/interfaces/specificcategorie';
import { Successadd } from 'src/app/shared/interfaces/successadd';
import { CartService } from 'src/app/shared/services/cart.service';
import { CategorisService } from 'src/app/shared/services/categoris.service';
import { OffersService } from 'src/app/shared/services/offers.service';
import { SharedProductsService } from 'src/app/shared/services/shared-products.service';

@Component({
  selector: 'app-specific-category',
  templateUrl: './specific-category.component.html',
  styleUrls: ['./specific-category.component.css'],
})
export class SpecificCategoryComponent implements OnInit {
  categoryDetails!: Specificcategorie;
  categoryProducts!: Allproducts[];

  changeDisplay: boolean = true;
  searchTitle: string = '';
  dataindex: number = 1;
  productsLoaded: boolean = true;
  searchArray: Allproducts[] = [];
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _CategorisService: CategorisService,
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

  categoryId!: string | null;

  getCategoryIDFromRoute(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (response) => {
        this.categoryId = response.get('id');
        this.getSpecificCategory(this.categoryId);
      },
    });
  }

  getSpecificCategory(categoryId: string | null): void {
    this._CategorisService.getSpecificCategory(categoryId).subscribe({
      next: (response) => {
        this.categoryDetails = response.data;
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
          if (product.category.name == this.categoryDetails.name) {
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
