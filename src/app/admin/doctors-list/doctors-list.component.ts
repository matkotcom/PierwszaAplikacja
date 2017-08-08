import { Component, OnInit } from '@angular/core';

import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.less']
})
export class DoctorsListComponent implements OnInit {

  doctorsTab: Doctor[] = [
    {
      id: 1,
      name: "Jan",
      surname: "Nowak",
      spec: ["Okulista, Laryngolog, Dietetyk"]
    },
    {
      id: 2,
      name: "Tomasz",
      surname: "Wawrzyn",
      spec: ["Dentysta"]
    },
    {
      id: 3,
      name: "Kamil",
      surname: "Wysocki",
      spec: ["ortopeda"]
    }
  ];

  dodajLekarza(lekarz: Doctor) {
    this.doctorsTab.push(lekarz);
    console.log("Wywolano funkcje dodajLekarza");
    // spr/zrob czy this.doctorsTab.spec jest tablica, czy specki sa w innych indeksach

    // console.log("lekarz spec = " + lekarz.spec);
    // console.log("lekarz spec typeof = " + typeof lekarz.spec);

    // let specjalizacje: string = "";
    // for(let i of lekarz.spec) { //lekarz.spec to tablica pojedynczych znakow: liter, przecinkow i spacji
    //   specjalizacje += i;
    // }

    // console.log("specjalizacje = " + specjalizacje);
    // console.log("typeof specjalizacje = " + typeof specjalizacje);
    
    // let tablicaSpecjalizacji: string[] = specjalizacje.split(", ");

    // for(let i of tablicaSpecjalizacji) {
    //   console.log(i);
    // }

    // lekarz.spec = tablicaSpecjalizacji;
    // this.doctorsTab.push(lekarz);
    // console.log("lekarz spec = " + lekarz.spec);
    // console.log("lekarz spec typeof = " + typeof lekarz.spec);
  }

  constructor() { }

  ngOnInit() {
  }

}
