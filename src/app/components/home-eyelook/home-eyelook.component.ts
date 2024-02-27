import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Allproducts } from 'src/app/shared/interfaces/allproducts';
import { SharedProductsService } from 'src/app/shared/services/shared-products.service';

@Component({
  selector: 'app-home-eyelook',
  templateUrl: './home-eyelook.component.html',
  styleUrls: ['./home-eyelook.component.css'],
})
export class HomeEyelookComponent {
  @Input() AllproductsInit: Allproducts[] = [];
  @Input() productIndex: number = 0;
  imageSliderEye!: Allproducts;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
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
