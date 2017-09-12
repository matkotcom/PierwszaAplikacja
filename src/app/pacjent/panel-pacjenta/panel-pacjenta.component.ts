import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SesjaService } from "app/sesja.service";
import { UzytkownikService } from "app/uzytkownik/uzytkownik.service";
import { PacjentService } from "app/pacjent/pacjent.service";

@Component({
  selector: 'panel-pacjenta',
  templateUrl: './panel-pacjenta.component.html',
  styleUrls: ['./panel-pacjenta.component.less'],
  providers: [UzytkownikService, PacjentService]
})
export class PanelPacjentaComponent implements OnInit {

  sprawdzUprawnienia() {
    let userId = this.sesjaService.getItem('userId');
    let token = this.sesjaService.getItem('token');
    this.uzytkowniktService.pobierzDaneUzytkownika(userId, token).subscribe(
      value => {
        if (value['role'] != 'Pacjent') //jesli ktos kto nie jest pacjentem chce wejsc na dana zakladke to przekierowujemy go do wyszukiwania terminu (troche bez sensu, ale niech na razie tak zostanie)
          this.router.navigate(['pacjent/rejestracja']);
        else if (value['role'] === 'Pacjent') {
          //tutaj funkcja pobierajaca terminy danego pacjenta
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  pobierzTerminyPacjenta() {
    this.pacjentService //
    //spr co robi pobierzTermin w tym serwisie, czym jest ten id ktory podajemy czy id terminu czy id np. lekarza
  }

  constructor(private uzytkowniktService: UzytkownikService,
              private pacjentService: PacjentService,
              private router: Router,
              private sesjaService: SesjaService) { }

  ngOnInit() {
    this.sprawdzUprawnienia();
  }

}
