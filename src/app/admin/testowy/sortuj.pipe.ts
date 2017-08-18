import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortuj'
})
export class SortujPipe implements PipeTransform {

  transform(imiona: string[], typ: string): string[] {
    // console.log("imiona = " + imiona);
    if (typ === 'malejaco')
      return imiona.sort().reverse();
    return imiona.sort();
  }

}
