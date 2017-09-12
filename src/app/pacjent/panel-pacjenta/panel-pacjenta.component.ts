import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SesjaService } from "app/sesja.service";
import { UzytkownikService } from "app/uzytkownik/uzytkownik.service";
import { PacjentService } from "app/pacjent/pacjent.service";
import { Termin } from "app/admin/models/termin";
import { Doctor } from "app/admin/models/doctor";
import { TerminZLekarzem } from "app/admin/models/terminZLekarzem";
import { TestowyService } from "app/admin/testowy.service";

@Component({
  selector: 'panel-pacjenta',
  templateUrl: './panel-pacjenta.component.html',
  styleUrls: ['./panel-pacjenta.component.less'],
  providers: [UzytkownikService, PacjentService, TestowyService]
})
export class PanelPacjentaComponent implements OnInit {

  terminyPacjentaTab: Termin[] = [];
  terminyPacjentaZLekarzamiTab: TerminZLekarzem[] = [];
  dataDzisiejsza: Date = null;

  sprawdzUprawnienia() {
    let userId = this.sesjaService.getItem('userId');
    let token = this.sesjaService.getItem('token');
    this.uzytkowniktService.pobierzDaneUzytkownika(userId, token).subscribe(
      value => {
        if (value['role'] != 'Pacjent') //jesli ktos kto nie jest pacjentem chce wejsc na dana zakladke to przekierowujemy go do wyszukiwania terminu (troche bez sensu, ale niech na razie tak zostanie)
          this.router.navigate(['pacjent/rejestracja']);
        else if (value['role'] === 'Pacjent') {
          this.pobierzTerminyPacjenta(value['id']);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  pobierzTerminyPacjenta(idPacjenta: string) {
    this.terminyPacjentaTab = [];
    this.pacjentService.pobierzTerminyPacjenta(idPacjenta).subscribe(
      value => {
        // console.log("Pobrane terminy pacjenta:");
        // console.log(value);
        this.terminyPacjentaTab = value;
        if (this.terminyPacjentaTab.length > 0)
          this.polaczDaneTerminuIDaneLekarza();
      },
      error => {
        console.log(error);
      }
    )
  }

  polaczDaneTerminuIDaneLekarza() {
    this.terminyPacjentaZLekarzamiTab = [];
    if (this.terminyPacjentaTab.length > 0) {
      for (let termin of this.terminyPacjentaTab) {
        this.pacjentService.pobierzLekarza(termin['idLekarza']).subscribe(
          value => {
            // console.log("Odbieram dane o lekarzu:");
            // console.log(value);
            if (termin.idLekarza === value['id']) {
              // console.log("if ok");
              let terminZLekarzem: TerminZLekarzem = new TerminZLekarzem();
              terminZLekarzem['data'] = termin.data;
              terminZLekarzem['start'] = termin.start;
              terminZLekarzem['stop'] = termin.stop;
              terminZLekarzem['miasto'] = termin.miasto;
              terminZLekarzem['id'] = termin.id;

              terminZLekarzem['name'] = value['name'];
              terminZLekarzem['surname'] = value['surname'];
              terminZLekarzem['specs'] = value['specs'];

              let rok = parseInt(terminZLekarzem['data'].substr(0,4));
              let miesiac = parseInt(terminZLekarzem['data'].substr(5,2)) - 1;
              let dzien = parseInt(terminZLekarzem['data'].substr(8,2));
              let godz = parseInt(terminZLekarzem['start'].substr(0,2));
              let min = parseInt(terminZLekarzem['start'].substr(3,2));
              let dataTerminu = new Date(rok, miesiac, dzien, godz, min, 0);
              let dataDzisiaj = new Date();
              if (dataDzisiaj < dataTerminu) {
                terminZLekarzem['minal'] = false;
              }
              else
                terminZLekarzem['minal'] = true;

              this.terminyPacjentaZLekarzamiTab.push(terminZLekarzem);
            }
          },
          error => {
            console.log(error);
          }
        )
      }
    }
  }

  zrezygnujZWizyty(terminZLekarzem: TerminZLekarzem) {
    let rok = parseInt(terminZLekarzem.data.substr(0,4));
    let miesiac = parseInt(terminZLekarzem.data.substr(5,2)) - 1;
    let dzien = parseInt(terminZLekarzem.data.substr(8,2));
    let godz = parseInt(terminZLekarzem.start.substr(0,2));
    let min = parseInt(terminZLekarzem.start.substr(3,2));

    let dataTerminu = new Date(rok, miesiac, dzien, godz, min, 0);
    let dataDzisiaj = new Date();

    if (dataDzisiaj < dataTerminu) {
      let obj = {};
      obj['wolny'] = true;
      obj['pacjent'] = null;
      obj['powod'] = null;
      obj['idPacjenta'] = null;
      this.testowyService.zaktualizujPoleTerminu(terminZLekarzem.id, obj).subscribe(
        value => {
          console.log("Zaktualizowano pole terminu, teraz wyglada tak:");
          console.log(value);
          alert("Rezerwacja terminu zostala usunieta");
          this.sprawdzUprawnienia();
        },
        error => console.log(error)
      )
    }
  }















  constructor(private uzytkowniktService: UzytkownikService,
              private pacjentService: PacjentService,
              private testowyService: TestowyService,
              private router: Router,
              private sesjaService: SesjaService) { }

  ngOnInit() {
    this.dataDzisiejsza = new Date();
    this.sprawdzUprawnienia();
  }

}
