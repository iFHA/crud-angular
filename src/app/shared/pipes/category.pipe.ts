import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: string): string {
    if(value.toLowerCase() === 'back-end') {
      return 'computer';
    }
    return 'code';
  }

}
