import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { UserCart } from 'src/app/shared/interfaces/user-cart';
import { CartService } from 'src/app/shared/services/cart.service';
import { OffersService } from 'src/app/shared/services/offers.service';
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
    private _WishListService: WishListService,
    private _OffersService: OffersService
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
        console.log(this.allCartItems);
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
  @Input() activeAction: string = '';
  ngOnChanges(changes: SimpleChanges): void {
    this.getCartData();
  }

  ChangeCount(itemId: number, flag: string, currentIndex: number) {
    if (flag == 'plus' && itemId > 0) {
      console.log(
        (this.allCartItems.data.products[currentIndex].count = itemId++)
      );
    } else if (flag == 'minus' && itemId > 0) {
      console.log(
        (this.allCartItems.data.products[currentIndex].count = itemId--)
      );
    }
  }

  sendNewCount(productId: string, productCount: number): void {
    console.log(productId, productCount);
    this._CartService.updateQuantity(productId, productCount).subscribe({
      next: (response: UserCart) => {
        this.allCartItems = response;
        let cartTotalProducts: number = 0;
        response.data.products.forEach((element) => {
          cartTotalProducts += element.count;
        });
        this._ToastrService.success(
          'cart Updated successfully' + '<img src="./assets/6828646.png">'
        );
        this._CartService.updateCartCound(cartTotalProducts);
      },
    });
  }
  geOffer(name: string): number {
    return this._OffersService.getOfferCart(name);
  }
}
