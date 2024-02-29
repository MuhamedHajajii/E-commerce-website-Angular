import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/shared/interfaces/categories';
import { CategorisService } from 'src/app/shared/services/categoris.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css'],
})
export class SubcategoriesComponent implements OnInit {
  constructor(private _CategorisService: CategorisService) {}

  allCategories!: Categories[];

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this._CategorisService.getAllCategories().subscribe({
      next: (response) => {
        console.log(response.data);
        this.allCategories = response.data;
      },
    });
  }
}
