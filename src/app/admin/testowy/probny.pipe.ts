import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'probny'
})
export class ProbnyPipe implements PipeTransform {

  transform(imie: string, newName: string): string {
    // console.log("imie = " + imie);
    if (imie === 'Doctor' || imie === 'Test')
      return newName;
    return imie;
  }
  
}
