import { Component, OnInit } from '@angular/core';
import { Doctor } from "app/admin/models/doctor";
import { Termin } from "app/admin/models/termin";
import { PacjentService } from "app/pacjent/pacjent.service";
import { TerminLekarza } from "app/admin/models/terminLekarza";

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

  pobierzLekarzy() {
    this.pacjentService.pobierzLekarzy().subscribe(
      value => this.lekarzeTab = value,
      error => console.log(error),
      () => console.log('Przetworzono zapytanie http, metoda pobierzLekarzy()')
    )
  }

  pobierzTerminy() {
    this.pacjentService.pobierzTerminy().subscribe(
      value => this.terminyTab = value,
      error => console.log(error),
      () => console.log('Przetworzono zapytanie http, metoda pobierzTerminy()')
    )
  }

  schowajLekarzy() {
    if (this.lekarzeTab.length > 0)
      this.lekarzeTab = [];
    else 
      this.pobierzLekarzy();
  }

  schowajTerminy() {
    if (this.terminyTab.length > 0)
      this.terminyTab = [];
    else
        this.pobierzTerminy();
  }
  
  utworzTabeleTerminowLekarzy() {
    for (let termin of this.terminyTab) {
      let terminZLekarzem = {};
      let idLekarza = termin.idLekarza;

      for (let lekarz of this.lekarzeTab) {
        if (lekarz.id === idLekarza) {
          terminZLekarzem['name'] = lekarz.name;
          terminZLekarzem['surname'] = lekarz.surname;
          terminZLekarzem['specs'] = lekarz.specs;
          terminZLekarzem['cities'] = lekarz.cities;
          terminZLekarzem['data'] = termin.data;
          terminZLekarzem['start'] = termin.start;
          terminZLekarzem['stop'] = termin.stop;
          terminZLekarzem['wolny'] = termin.wolny;
          terminZLekarzem['id'] = termin.id;
          terminZLekarzem['idLekarza'] = termin.idLekarza;
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

  schowajTerminyzLekarzami() {
    if (this.terminyZLekarzamiTab.length > 0)
      this.terminyZLekarzamiTab = [];
    else
        this.utworzTabeleTerminowLekarzy();
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

    this.utworzTabeleTerminowLekarzy();
  }

  constructor(private pacjentService: PacjentService) { }

  ngOnInit() {
    this.pobierzLekarzy();
    this.pobierzTerminy();
  }

}
