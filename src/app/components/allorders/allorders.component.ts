import { Component, OnInit } from '@angular/core';
import { Allorders } from 'src/app/shared/interfaces/allorders';
import { AllordersService } from 'src/app/shared/services/allorders.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
})
export class AllordersComponent implements OnInit {
  truckCounter: number = 0;
  allOrders!: Allorders;
  constructor(private _AllordersService: AllordersService) {}

  ngOnInit(): void {
    this.getUserOrders();
  }

  getUserOrders(): void {
    this._AllordersService.getUserOrders().subscribe({
      next: (response: Allorders) => {
        this._AllordersService.changeTruckCount(response.length);
        this.truckCounter = response.length;
        this.allOrders = response;
        console.log(response);
      },
    });
  }
}
