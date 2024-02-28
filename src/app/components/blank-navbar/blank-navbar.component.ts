import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCart } from 'src/app/shared/interfaces/user-cart';
import { AuthServisesService } from 'src/app/shared/services/auth-servises.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-blank-navbar',
  templateUrl: './blank-navbar.component.html',
  styleUrls: ['./blank-navbar.component.css'],
})
export class BlankNavbarComponent implements OnInit {
  userName: string = '';
  constructor(
    private _AuthServisesService: AuthServisesService,
    private _Router: Router,
    private _CartService: CartService
  ) {}
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
}
