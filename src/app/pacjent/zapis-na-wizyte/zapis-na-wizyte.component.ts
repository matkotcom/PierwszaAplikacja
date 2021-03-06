import { Component, OnInit } from '@angular/core';
import { PacjentService } from "app/pacjent/pacjent.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Termin } from "app/admin/models/termin";
import { Doctor } from "app/admin/models/doctor";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { UzytkownikService } from "app/uzytkownik/uzytkownik.service";
import { SesjaService } from "app/sesja.service";

@Component({
  selector: 'zapis-na-wizyte',
  templateUrl: './zapis-na-wizyte.component.html',
  styleUrls: ['./zapis-na-wizyte.component.less'],
  providers: [PacjentService, UzytkownikService, SesjaService]
})
export class ZapisNaWizyteComponent implements OnInit {

  termin: Termin;
  lekarz: Doctor;
  zapisForm: FormGroup;

  pobierzDaneTerminuZLekarzem() {
    const id = +this.route.snapshot.params['id'];
    console.log(id);
    this.pacjentService.pobierzTermin(id).subscribe(
      value => {
        console.log("pobierzDaneTerminuZLekarzem VALUE")
        console.log("PRZED this.termin = ");
        console.log(this.termin);
        this.termin = value;
        console.log("PO this.termin = ");
        console.log(this.termin);
        this.pobierzDaneLekarza(this.termin.idLekarza);
      },
      error => {
        console.log("pobierzDaneTerminuZLekarzem ERROR")
        console.log(error);
      },
      () => {
        console.log("KONIEC this.termin = ");
        console.log(this.termin);
        console.log("pobierzDaneTerminuZLekarzem() ZAKONCZONE");
      }

    )
  }

  pobierzDaneLekarza(id: string) {
    this.pacjentService.pobierzLekarza(id).subscribe(
      value => {
        console.log("pobierzDaneLekarza VALUE")
        this.lekarz = value;
      },
      error => {
        console.log("pobierzDaneLekarza ERROR")
        console.log(error);
      },
      () => {
        console.log("pobierzDaneLekarza() ZAKONCZONE")
      }
    )
  }

  buildZapisForm() {
    return this.formBuilder.group({
      powod: []
    })
  }

  zapiszNaWizyte() {
    let token = this.sesjaService.getItem('token');
    let userId = this.sesjaService.getItem('userId');

    this.uzytkownikService.pobierzDaneUzytkownika(userId, token).subscribe(
      value => {
        let dane: Object = {};
        let name = value['name'];
        let surname = value['surname'];
        dane['wolny'] = false;
        dane['powod'] = this.zapisForm.get('powod').value;
        dane['idPacjenta'] = value['id'];
        dane['pacjent'] = `${name} ${surname}`;
        this.sesjaService.setItem('name', value['name']);
        this.sesjaService.setItem('surname', value['surname']);
        // let daneJSON = JSON.stringify(dane); //spr, czemu to nie dziala

        this.pacjentService.zapiszPacjenta(this.termin.id, dane).subscribe(
          value => {
            alert("Zapisano pomyslnie");
            this.router.navigate(['pacjent/panel']);
          },
          error => {
            console.log(error);
          },
          () => {
            console.log("zapiszNaWizyte() ZAKONCZONO")
          }
        )
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("this.uzytkownikService.pobierzDaneUzytkownika() przetworzono");
      }
    )

  }

  anulujZapisywanie() {
    this.router.navigate(['pacjent/rejestracja']);
  }

  constructor(private pacjentService: PacjentService,
              private uzytkownikService: UzytkownikService,
              private sesjaService: SesjaService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.pobierzDaneTerminuZLekarzem();
    this.zapisForm = this.buildZapisForm();
    console.log("termin:");
    console.log(this.termin);
    console.log("lekarz:");
    console.log(this.lekarz);
  }

}
