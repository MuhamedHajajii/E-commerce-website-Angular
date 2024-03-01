import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserCart } from 'src/app/shared/interfaces/user-cart';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishListService } from 'src/app/shared/services/wish-list.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  allCartItems!: UserCart | any;
  currentWishList: string[] = [''];
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _WishListService: WishListService
  ) {}
  ngOnInit(): void {
    this.getCartData();
    this.getUserLogedWishList();
  }
  currentUserCartId: string = '';
  getCartData(): void {
    this._CartService.getCurrentUserCart().subscribe({
      next: (response: UserCart) => {
        this.allCartItems = response;
        this.currentUserCartId = response.data._id;
        if (response.numOfCartItems == 0) {
          this.allCartItems = undefined;
        }
      },
    });
  }
  deleteItem(productID: string): void {
    this._CartService.removeCartItem(productID).subscribe({
      next: (respose: UserCart) => {
        this.allCartItems = respose;
        let cartTotalProducts: number = 0;
        respose.data.products.forEach((element) => {
          cartTotalProducts += element.count;
        });
        this._CartService.updateCartCound(cartTotalProducts);
        this._ToastrService.warning('Item has been Removed');
        if (respose.numOfCartItems == 0) {
          this.allCartItems = undefined;
        }
      },
    });
  }
  ChangeCount(_ID: string, newNumber: number): void {
    if (newNumber > 0) {
      this._CartService.updateQuantity(_ID, newNumber).subscribe({
        next: (response: UserCart) => {
          this.allCartItems = response;
          let cartTotalProducts: number = 0;
          response.data.products.forEach((element) => {
            cartTotalProducts += element.count;
          });
          this._CartService.updateCartCound(cartTotalProducts);
        },
      });
    } else if (newNumber <= 0) {
      this.deleteItem(_ID);
    }
  }
  clearCart(): void {
    this._CartService.clearCart().subscribe({
      next: () => {
        this._ToastrService.warning('Cart Empty');
        this._CartService.updateCartCound(0);
        this.allCartItems = undefined;
      },
    });
  }
  OnlinePayMent(): void {
    this._Router.navigate(['/useradress', this.currentUserCartId]);
  }
  OnlineCash(): void {
    this._Router.navigate(['/cash', this.currentUserCartId]);
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
