import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Allproducts } from 'src/app/shared/interfaces/allproducts';
import { Successadd } from 'src/app/shared/interfaces/successadd';
import { CartService } from 'src/app/shared/services/cart.service';
import { OffersService } from 'src/app/shared/services/offers.service';
import { SharedProductsService } from 'src/app/shared/services/shared-products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  constructor(
    private _OffersService: OffersService,
    private _SharedProductsService: SharedProductsService,
    private _ToastrService: ToastrService,
    private _CartService: CartService
  ) {}
  changeDisplay: boolean = true;
  searchTitle: string = '';
  homeProducts: Allproducts[] = [];
  dataindex: number = 1;

  ngOnInit(): void {
    this._SharedProductsService.ShareResult.subscribe((data) => {
      this.homeProducts = data;
    });
    this.homeProducts = this._SharedProductsService.currentProducts;
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
    this.searchArray = this._SharedProductsService.currentProducts.filter(
      (curentProduct) =>
        curentProduct.title.toLowerCase().includes(searchvalue.toLowerCase())
    );
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
