import { Component, OnInit } from '@angular/core';
import { Doctor } from "app/admin/models/doctor";
import { Termin } from "app/admin/models/termin";
import { PacjentService } from "app/pacjent/pacjent.service";
import { TerminLekarza } from "app/admin/models/terminLekarza";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormArray, FormControl } from '@angular/forms';

interface Miasto {
  nazwa: string;
  checked: boolean;
}

@Component({
  selector: 'rejestracja-pacjenta',
  templateUrl: './rejestracja-pacjenta.component.html',
  styleUrls: ['./rejestracja-pacjenta.component.less'],
  providers: [PacjentService]
})
export class RejestracjaPacjentaComponent implements OnInit {

  lekarzeTab: Doctor[] = [];
  terminyTab: Termin[] = [];
  terminyZLekarzamiTab: any[] = [];
  dostepneSpecjalizacje: String[] = ["---"];
  dostepneMiasta: String[] = [];
  searchForm: FormGroup;
  wolneTerminyTab: any[] = [];



  pobierzLekarzy() {
    this.pacjentService.pobierzLekarzy().subscribe(
      value => this.lekarzeTab = value,
      error => console.log(error),
      () => console.log('Przetworzono zapytanie http, metoda pobierzLekarzy()')
    )
  }

  schowajLekarzy() {
    if (this.lekarzeTab.length > 0)
      this.lekarzeTab = [];
    else 
      this.pobierzLekarzy();
  }

  pobierzTerminy() {
    this.pacjentService.pobierzTerminy().subscribe(
      value => this.terminyTab = value,
      error => console.log(error),
      () => console.log('Przetworzono zapytanie http, metoda pobierzTerminy()')
    )
  }

  schowajTerminy() {
    if (this.terminyTab.length > 0)
      this.terminyTab = [];
    else
        this.pobierzTerminy();
  }
  
  utworzTabeleWolnychTerminowLekarzy() {
    for (let termin of this.terminyTab) {
      //buduje liste wolnych terminow
      if (termin.wolny === true) {
        let terminZLekarzem = {};
        let idLekarza = termin.idLekarza;

        for (let lekarz of this.lekarzeTab) {
          if (lekarz.id === idLekarza) {
            terminZLekarzem['name'] = lekarz.name;
            terminZLekarzem['surname'] = lekarz.surname;
            terminZLekarzem['specs'] = lekarz.specs;
            // terminZLekarzem['cities'] = lekarz.cities; //spr, tak bylo, zle, wyswietla wszystkie miasta, w ktorych przyjmuje lekarz, zamiast miasta ktorego dotyczy dany termin
            terminZLekarzem['data'] = termin.data;
            terminZLekarzem['start'] = termin.start;
            terminZLekarzem['stop'] = termin.stop;
            terminZLekarzem['wolny'] = termin.wolny;
            terminZLekarzem['id'] = termin.id;
            terminZLekarzem['idLekarza'] = termin.idLekarza;
            terminZLekarzem['miasto'] = termin.miasto;
            // console.log("terminZLekarzem = ");
            // console.log(terminZLekarzem);
            this.terminyZLekarzamiTab.push(terminZLekarzem);
            break;
          }
        }

        // console.log("this.terminyZLekarzamiTab = ");
        // console.log(this.terminyZLekarzamiTab);
      }
    }
  }

  schowajTerminyzLekarzami() {
    if (this.terminyZLekarzamiTab.length > 0)
      this.terminyZLekarzamiTab = [];
    else
        this.utworzTabeleWolnychTerminowLekarzy();
  }

  zbudujWartosciFormularza() {
    for (let lekarz of this.lekarzeTab) {
      //dodajemy specjalizacje
      for (let spec of lekarz.specs) {
        if (this.dostepneSpecjalizacje.indexOf(spec) === -1) { //jesli speclaizacji nie ma w tablicy dostepnych specjalizacji to ja dodajemy
          this.dostepneSpecjalizacje.push(spec);
        }
      }

      //dodajemy miasta
      for (let miasto of lekarz.cities) {
        if (this.dostepneMiasta.indexOf(miasto) === -1) {
          this.dostepneMiasta.push(miasto);
          // this.dostepneMiasta.push({
          //   "nazwa": miasto,
          //   "checked": false
          // });
        }
      }
    }
    console.log(this.dostepneSpecjalizacje);
    console.log(this.dostepneMiasta);
  }

  buildSearchForm() {
    return this.formBuilder.group({
      //do testow takie:
      spec: ['Ortopeda', [Validators.required]],
      cities: [null, [Validators.required]],
      dataStart: ['2017-08-27', [Validators.required]],
      dataStop: ['2017-08-29', [Validators.required]]
      //poprawne takie:
      // spec: [null, [Validators.required]],
      // cities: [null, [Validators.required]],
      // dataStart: [null, [Validators.required]],
      // dataStop: [null, [Validators.required]]
    })
  }

  szukajTerminu() {
    this.wolneTerminyTab = [];
    let wybranaSpecjalizacja = this.searchForm.get('spec').value;
    let wybraneMiasta = ["Opole", "Krakow", "Katowice", "Pacanowo"];
    let wybranaDataStart = this.searchForm.get('dataStart').value;
    let wybranaDataStop = this.searchForm.get('dataStop').value;

    let wybranaDataStartTime = Date.parse(wybranaDataStart);
    let wybranaDataStopTime = Date.parse(wybranaDataStop);

    for (let termin of this.terminyZLekarzamiTab) { //termin z polaczonej tabeli
      for (let spec of termin.specs) { //specjalizacja z danego terminu
        // if ((spec === wybranaSpecjalizacja) || (wybranaSpecjalizacja === null) || (wybranaSpecjalizacja === '---')){ //jesli jest rowna wybranej specjalizacji to: //jesli nie trzeba podawac specjalizacji to ta linijka jest ok
        if (spec === wybranaSpecjalizacja) { //jesli jest rowna wybranej specjalizacji to:
          for (let city of wybraneMiasta) { //miasto z wybranych miast
            if (city === termin.miasto) { //jesli jest rowne miastu z danego terminu to:
              let dataTerminuTime = Date.parse(termin.data); //konwertuje date terminu
              if ((wybranaDataStartTime <= dataTerminuTime) && (dataTerminuTime <= wybranaDataStopTime)) { //jesli termin sie zgadza
                this.wolneTerminyTab.push(termin); //dodaje termin z lekarzem do tablicy wolnych (wedlug wyszukiwania) terminow
                console.log("Jest taki termin: ");
                console.log(termin);
              }
            }
          }
        }
      }
    }
  }




  test() {
    // console.log("this.lekarzeTab = ");
    // console.log(this.lekarzeTab);
    // for (let lekarz of this.lekarzeTab) {
    //   console.log(lekarz);
    // }

    // console.log("******************************");
    
    // console.log("this.terminyTab = ");
    // console.log(this.terminyTab);
    // for (let termin of this.terminyTab) {
    //   console.log(termin);
    // }

    // this.utworzTabeleWolnychTerminowLekarzy();
    this.utworzTabeleWolnychTerminowLekarzy();
    this.zbudujWartosciFormularza();
  }

  constructor(private pacjentService: PacjentService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.buildSearchForm();
    this.pobierzLekarzy();
    this.pobierzTerminy();
  }

}
