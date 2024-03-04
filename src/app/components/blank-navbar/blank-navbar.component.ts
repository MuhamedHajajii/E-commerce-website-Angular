import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Allorders } from 'src/app/shared/interfaces/allorders';
import { UserCart } from 'src/app/shared/interfaces/user-cart';
import { AllordersService } from 'src/app/shared/services/allorders.service';
import { AuthServisesService } from 'src/app/shared/services/auth-servises.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishListService } from 'src/app/shared/services/wish-list.service';

@Component({
  selector: 'app-blank-navbar',
  templateUrl: './blank-navbar.component.html',
  styleUrls: ['./blank-navbar.component.css'],
})
export class BlankNavbarComponent implements OnInit {
  userName: string | null = '';
  truckCount: number = 0;
  wishList: number = 0;
  constructor(
    private _AuthServisesService: AuthServisesService,
    private _Router: Router,
    private _CartService: CartService,
    private _AllordersService: AllordersService,
    private _WishListService: WishListService,
    private _Renderer2: Renderer2
  ) {}
  getTruckCount(): void {
    this._AllordersService.changeOrdersCount.subscribe({
      next: (response) => {
        this.truckCount = response;
      },
    });
  }
  showSignOut(icon: HTMLSpanElement): void {
    icon.classList.toggle('d-none');
  }
  stopProp(e: Event): void {
    e.stopPropagation();
  }
  ngOnInit(): void {
    this._AuthServisesService.GetUserToken();
    this.getUserNAme();
    this.getUserCart();
    this.updateCount();
    this.getTruckCount();
    this.getUserOrders();
    this.changeCoundWishList();
    this.getWishList();
  }

  changeCoundWishList(): void {
    this._WishListService.changeWishList.subscribe({
      next: (response) => {
        this.wishList = response;
      },
    });
  }
  getWishList(): void {
    this._WishListService.getUserWishList().subscribe({
      next: (response) => {
        this._WishListService.getCurrentUserWishList(response);
        this.wishList = response.data.length;
        this._WishListService.userWishList = response;
      },
    });
  }

  getUserNAme(): void {
    this._AuthServisesService.userName.subscribe({
      next: (response) => {
        if (response != '') {
          this.userName = response;
        } else if (localStorage.getItem('userName') != null) {
          this.userName = localStorage.getItem('userName');
        }
      },
    });
  }
  singOut(): void {
    this._Router.navigate(['/login']);
    localStorage.removeItem('userToken');
  }
  cartCount: number = 0;
  getUserCart(): void {
    this._CartService.getCurrentUserCart().subscribe({
      next: (response: UserCart) => {
        let Counter = 0;
        response.data.products.forEach((element) => {
          Counter += element.count;
        });
        this.cartCount = Counter;
      },
      error: (err) => {},
    });
  }
  updateCount(): void {
    this._CartService.totalCartItems.subscribe({
      next: (response) => {
        this.cartCount = response;
      },
    });
  }
  getUserOrders(): void {
    this._AllordersService.getUserOrders().subscribe({
      next: (response: Allorders) => {
        this._AllordersService.changeTruckCount(response.length);
        this.truckCount = response.length;
      },
    });
  }

  @ViewChild('navBanner') navElement!: ElementRef;
  @ViewChild('navCounters') navCounters!: ElementRef;
  @ViewChild('navSocialIcons') navSocialIcons!: ElementRef;
  @ViewChild('navMainCounters') navMainCounters!: ElementRef;

  @HostListener('window:scroll')
  onNavScroll(): void {
    if (scrollY > 120) {
      this._Renderer2.addClass(this.navElement.nativeElement, 'd-none');
      this._Renderer2.addClass(this.navSocialIcons.nativeElement, 'd-none');
      this._Renderer2.removeClass(this.navCounters.nativeElement, 'd-none');
      this._Renderer2.addClass(this.navMainCounters.nativeElement, 'd-none');
    } else {
      this._Renderer2.removeClass(this.navElement.nativeElement, 'd-none');
      this._Renderer2.removeClass(this.navSocialIcons.nativeElement, 'd-none');
      this._Renderer2.addClass(this.navCounters.nativeElement, 'd-none');
      this._Renderer2.removeClass(this.navMainCounters.nativeElement, 'd-none');
    }
  }
  fireCart(): void {
    this.activeAction += `0`;
  }
  activeAction: string = '';
  cartFlow(e: Event): void {
    e.stopPropagation();
  }

  closeNavBar(e: HTMLDivElement): void {
    e.classList.remove('show');
  }
}
