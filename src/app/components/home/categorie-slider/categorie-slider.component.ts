import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Categories } from 'src/app/shared/interfaces/categories';
import { CategorisService } from 'src/app/shared/services/categoris.service';

@Component({
  selector: 'app-categorie-slider',
  templateUrl: './categorie-slider.component.html',
  styleUrls: ['./categorie-slider.component.css'],
})
export class CategorieSliderComponent implements OnInit {
  allCategories: Categories[] = [];
  constructor(private _CatigoriesService: CategorisService) {}

  CatigoriesService() {
    this._CatigoriesService.getAllCategories().subscribe({
      next: (respose) => {
        this.allCategories = respose.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    this.CatigoriesService();
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    margin: 15,
    autoplay: true,
    autoplaySpeed: 1000,
    dots: false,
    navSpeed: 500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3,
        loop: true,
      },
      400: {
        items: 4,
        loop: true,
      },
      740: {
        items: 6,
        loop: true,
      },
      940: {
        items: 10,
        loop: true,
      },
    },
    nav: false,
  };
}
