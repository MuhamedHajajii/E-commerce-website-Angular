import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
})
export class AllordersComponent implements OnInit {
  constructor(private _CartService: CartService) {}
  ngOnInit(): void {
    this.getUserOrders();
  }

  getUserOrders(): void {
    this._CartService.getUserOrders().subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
}
