import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categories } from 'src/app/shared/interfaces/categories';
import { SingleOrder } from 'src/app/shared/interfaces/single-order';
import { AllordersService } from 'src/app/shared/services/allorders.service';
import { OffersService } from 'src/app/shared/services/offers.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  singleOrderDeatails!: SingleOrder;
  displayProducts: boolean = true;
  changeDisplay: boolean = true;
  dataindex: number = 1;
  constructor(
    private _AllordersService: AllordersService,
    private _ActivatedRoute: ActivatedRoute,
    private _OffersService: OffersService
  ) {}

  ngOnInit(): void {
    this.getOrderSingleOrderID();
  }

  getOrderSingleOrderID(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (response) => {
        this.getSingleUserOrder(response.get('id'));
      },
    });
  }

  getSingleUserOrder(_id: string | null): void {
    this._AllordersService.getSingleOrderDetails(_id).subscribe({
      next: (response: SingleOrder) => {
        console.log((this.singleOrderDeatails = response));
      },
    });
  }

  displayOrderProducts(): void {
    this.displayProducts = false;
  }
  changedisplayClicOne(): void {
    this.changeDisplay = true;
  }
  changedisplayClicTwo(): void {
    this.changeDisplay = false;
  }
  currentIndex(i: number, lightBox: HTMLDivElement): void {
    lightBox.classList.remove('d-none');
    this.dataindex = i;
  }
  getOffer(items: any): number {
    return this._OffersService.getOfferCategoris(items);
  }
  closeLightBox(lightBox: HTMLDivElement): void {
    lightBox.classList.add('d-none');
  }
}
