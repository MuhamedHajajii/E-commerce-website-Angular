import { OffersService } from './../../shared/services/offers.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Allproducts } from 'src/app/shared/interfaces/allproducts';
import { GetHomeproductsService } from 'src/app/shared/services/get-homeproducts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private _GetHomeproductsService: GetHomeproductsService,
    private _OffersService: OffersService
  ) {}
  homeProducts!: Allproducts[];
  dataindex: number = 1;
  callApi!: Subscription;
  ngOnInit(): void {
    this.getAllproducts();
  }
  ngOnDestroy(): void {
    this.callApi.unsubscribe();
  }
  getAllproducts(): void {
    this.callApi = this._GetHomeproductsService.gitHomeProducts().subscribe({
      next: (response) => {
        this.homeProducts = response.data.splice(0, 15);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  currentIndex(i: number, lightBox: HTMLDivElement): void {
    lightBox.classList.remove('d-none');
    this.dataindex = i;
  }
  closeLightBox(lightBox: HTMLDivElement): void {
    lightBox.classList.add('d-none');
  }

  getOffer(i: number, items: Allproducts[]): string {
    return this._OffersService.getOffer(i, items);
  }
}
