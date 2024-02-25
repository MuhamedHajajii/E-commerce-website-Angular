import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Allproducts } from 'src/app/shared/interfaces/allproducts';
import { GetHomeproductsService } from 'src/app/shared/services/get-homeproducts.service';

@Component({
  selector: 'app-home-eyelook',
  templateUrl: './home-eyelook.component.html',
  styleUrls: ['./home-eyelook.component.css'],
})
export class HomeEyelookComponent {
  @Input() AllproductsInit: Allproducts[] = [];
  @Input() productIndex: number = 0;
  imageSliderEye!: Allproducts;
  constructor(private _GetHomeproductsService: GetHomeproductsService) {
    this.getAllproducts();
  }

  getAllproducts(): void {
    this._GetHomeproductsService.gitHomeProducts().subscribe({
      next: (response) => {
        this.AllproductsInit = response.data.splice(0, 15);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit(): void {
    this.AllproductsInit;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dispalyData();

    this.imageSliderEye = this.AllproductsInit[this.productIndex];
  }

  dispalyData(): void {
    this.imageSliderEye = this.AllproductsInit[this.productIndex];
  }

  stopPro(e: Event): void {
    e.stopPropagation();
  }

  changeMainPic(currentImage: any, change: HTMLImageElement): void {
    let first = change.getAttribute('src');
    let second = currentImage.getAttribute('src');
    currentImage.setAttribute('src', first);
    change.setAttribute('src', second);
  }
}
