import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textterm',
})
export class TexttermPipe implements PipeTransform {
  transform(text: string, length: number): string {
    return text.split(' ').splice(0, length).join(' ');
  }
}
