import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserCart } from 'src/app/shared/interfaces/user-cart';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  allCartItems!: UserCart | any;
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.getCartData();
  }
  getCartData(): void {
    this._CartService.getCurrentUserCart().subscribe({
      next: (response: UserCart) => {
        this.allCartItems = response;
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
        this.allCartItems = undefined;
      },
    });
  }
}
