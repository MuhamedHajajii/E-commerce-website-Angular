import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Allorders } from 'src/app/shared/interfaces/allorders';
import { UserCart } from 'src/app/shared/interfaces/user-cart';
import { AllordersService } from 'src/app/shared/services/allorders.service';
import { AuthServisesService } from 'src/app/shared/services/auth-servises.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-blank-navbar',
  templateUrl: './blank-navbar.component.html',
  styleUrls: ['./blank-navbar.component.css'],
})
export class BlankNavbarComponent implements OnInit {
  userName: string = '';
  truckCount: number = 0;
  constructor(
    private _AuthServisesService: AuthServisesService,
    private _Router: Router,
    private _CartService: CartService,
    private _AllordersService: AllordersService
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
  }
  getUserNAme(): void {
    if (localStorage.getItem('userToken') != null) {
      this.userName = this._AuthServisesService.userdata.name;
    }
  }
  singOut(): void {
    this._Router.navigate(['/login']);
    localStorage.removeItem('userToken');
  }
  cartCount: number = 0;
  getUserCart(): void {
    this._CartService.getCurrentUserCart().subscribe({
      next: (response: UserCart) => {
        response.data.products.forEach((element) => {
          this.cartCount += element.count;
        });
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
}
