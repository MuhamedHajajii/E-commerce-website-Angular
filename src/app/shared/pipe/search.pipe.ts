import { Pipe, PipeTransform } from '@angular/core';
import { Allproducts } from '../interfaces/allproducts';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(productArray: Allproducts[], searchText: string): Allproducts[] {
    return productArray.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
