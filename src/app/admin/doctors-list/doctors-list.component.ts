import { Component, OnInit } from '@angular/core';
import { DoktorService } from '../../doktor.service';
import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.less'],
  // providers: [DoktorService] //nie trzeba, bo dodalem go do providers w module
})
export class DoctorsListComponent implements OnInit {
  doctorsTab: Doctor[];

  // doctorsTab: Doctor[] = [
  //   {
  //     id: 1,
  //     name: "Jan",
  //     surname: "Nowak",
  //     spec: ["Okulista", "Laryngolog", "Dietetyk"]
  //   },
  //   new Doctor(2, "Tomasz", "Wawrzyn", ["Dentysta"]),
  //   new Doctor(3, "Pawel", "Nadworny", ["Lekarz", "Ortopeda", "Pediatra"]),
  //   new Doctor(4, "Witold", "Gawedziarz", ["Okulista", "Weterynarz"])
  // ];
  getDoctors(): void {
    this.doctorsTab = this.doktorService.getDoctors();
  }

  dodajLekarza(lekarz: Doctor) {
    console.log("Wywolano - dodajLekarza()");
    this.doctorsTab.push(lekarz);
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

  usunLekarza(lekarz: Doctor) {
    let indexDoUsuniecia = this.doctorsTab.indexOf(lekarz);
    if(indexDoUsuniecia !== -1) {
      this.doctorsTab.splice(indexDoUsuniecia, 1);
    }
    console.log("Wywolano - usunLekarza()")
  }

  constructor(private doktorService: DoktorService) {
  }

  ngOnInit() {
    this.getDoctors();
  }

}
