import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/shared/interfaces/categories';
import { CategorisService } from 'src/app/shared/services/categoris.service';

@Component({
  selector: 'app-allsupcategories',
  templateUrl: './allsupcategories.component.html',
  styleUrls: ['./allsupcategories.component.css'],
})
export class AllsupcategoriesComponent implements OnInit {
  constructor(private _CategorisService: CategorisService) {}

  ngOnInit(): void {
    this.getAllsupCategoeris();
  }

  allSubCategoreies!: Categories[];

  getAllsupCategoeris(): void {
    this._CategorisService.getAllSubCategories().subscribe({
      next: (response) => {
        this.allSubCategoreies = response.data;
      },
    });
  }
}
