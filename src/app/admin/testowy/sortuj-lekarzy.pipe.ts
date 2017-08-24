import { Pipe, PipeTransform } from '@angular/core';
import { Doctor } from '../models/doctor';

@Pipe({
  name: 'sortujLekarzy'
})
export class SortujLekarzyPipe implements PipeTransform {

  transform(listaLekarzy: Doctor[], typ: string): Doctor[] {
    // console.log("listaLekarzy = " + listaLekarzy);
    if(!listaLekarzy) {
      console.log("lista lekarzy jeszcze NIE zaladowana");
      return null;
    }
    
    console.log("lista lekarzy zaladowana!!!");
    return listaLekarzy.sort(function(a: Doctor, b: Doctor): number{
      a.surname.toLowerCase();
      b.surname.toLowerCase();
      
      if (typ === 'malejaco') {
        if (a.surname < b.surname)
          return 1;
        if (a.surname > b.surname)
          return -1;
        return 0;
      }
      
      if (a.surname < b.surname)
        return -1;
      if (a.surname > b.surname)
        return 1;
      return 0;
    });
  }

}
