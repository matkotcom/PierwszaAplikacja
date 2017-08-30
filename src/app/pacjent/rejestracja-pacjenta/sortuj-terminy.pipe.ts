import { Pipe, PipeTransform } from '@angular/core';
import { TerminZLekarzem } from "app/admin/models/terminZLekarzem";

@Pipe({
  name: 'sortujTerminy'
})
export class SortujTerminyPipe implements PipeTransform {

  transform(listaTerminowZLekarzami: TerminZLekarzem[]): TerminZLekarzem[] {
    if(!listaTerminowZLekarzami) {
      console.log("ListaTerminowZLekarzami jeszcze nie zaladowana");
      return null;
    }

    console.log("lista zaladowana");
    return listaTerminowZLekarzami.sort(function(a: TerminZLekarzem, b: TerminZLekarzem): number {
      let aData: Number = Date.parse(a.data);
      let bData: Number = Date.parse(b.data);

      //gdy zwracamy mniejsza od 0, oznacza to, ze a < b
      //gdy zwracamy wieksza od 0, oznacza to, ze a > b
      if (aData < bData) //aData jest blizej (czasowo), bData jest dalej
        return -1;
      else if (aData > bData)
        return 1;
      else { //gdy mamy ten sam dzien
        let aGodz = parseInt(a.start.substring(0,2));
        let bGodz = parseInt(b.start.substring(0,2));
        if (aGodz < bGodz)
          return -1;
        else if (aGodz > bGodz)
          return 1;
        else { //gdy dni i godziny sa rowne
          let aMin = parseInt(a.stop.substring(3,5));
          let bMin = parseInt(b.stop.substring(3,5));
          if (aMin < bMin)
            return -1;
          else if (aMin > bMin)
            return 1;
          else //takie same dni, godziny i minuty
            return 0;
        }
      }
    });
  }

}
