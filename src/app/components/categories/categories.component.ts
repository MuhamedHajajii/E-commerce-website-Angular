import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/shared/interfaces/categories';
import { CategorisService } from 'src/app/shared/services/categoris.service';
import { OffersService } from 'src/app/shared/services/offers.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  AllCategories: Categories[] = [];
  constructor(
    private _CatigoriesService: CategorisService,
    private _OffersService: OffersService
  ) {}
  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this._CatigoriesService.getAllCategories().subscribe({
      next: (response) => {
        console.log(response.data);
        this.AllCategories = response.data;
        console.log(this.AllCategories);
      },
    });
  }
  getOffer(items: Categories): number {
    return this._OffersService.getOfferCategoris(items);
  }
}
