import { Component, OnInit } from '@angular/core';
import { Doctor } from "app/admin/models/doctor";
import { Termin } from "app/admin/models/termin";
import { PacjentService } from "app/pacjent/pacjent.service";
import { TerminLekarza } from "app/admin/models/terminLekarza";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormArray, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from "@angular/router";
import { TerminZLekarzem } from "app/admin/models/terminZLekarzem";

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
  terminyZLekarzamiTab: TerminZLekarzem[] = [];
  
  searchForm: FormGroup;
  dostepneSpecjalizacje: String[] = ["---"];
  dostepneMiasta: String[] = [];
  
  wolneTerminyTab: any[] = [];
  
  showTerminyTab: boolean = true;
  showLekarzeTab: boolean = true;
  showTerminyZLekarzamiTab: boolean = true;

  tempDostepneMiasta = ["Wroclaw", "Warszawa", "Krakow", "Lublin", "Gdansk"];
  miastaInvalid: boolean = false;

  pobierzLekarzy() {
    this.pacjentService.pobierzLekarzy().subscribe(
      value => {
        this.lekarzeTab = value
        this.pobierzTerminy();
      },
      error => {
        console.log(error)
      },
      () => {
        console.log('Przetworzono zapytanie http, metoda pobierzLekarzy()')
      }
    )
  }

  pobierzTerminy() {
    this.pacjentService.pobierzTerminy().subscribe(
      value => {
        this.terminyTab = value
        if (this.lekarzeTab.length > 0) {
          console.log("**********");
          console.log("zaraz powinna sie utworzyc tabela wolnych terminow z lekarzami i zbudowac wartosci formularza");
          this.utworzTabeleWolnychTerminowLekarzy(); //dodane
          this.zbudujWartosciFormularza(); //dodane
        }
        console.log("**********");
        console.log("A zaraz powinien zbudowac sie formularz");
        this.buildSearchForm(); //dodane
      },
      error => {
        console.log(error)
      },
      () => {
        console.log('Przetworzono zapytanie http, metoda pobierzTerminy()')
      }
    )
  }
  
  utworzTabeleWolnychTerminowLekarzy() {
    for (let termin of this.terminyTab) {
      //buduje liste wolnych terminow
      if (termin.wolny === true) {
        let terminZLekarzem: TerminZLekarzem = new TerminZLekarzem();
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

  walidacja() {
    //spr, dokonczyc
    // https://angular.io/guide/form-validation
  }

  buildSearchForm() {
    console.log("Budujemy formularz");
    let obj = {};
    for (let x of this.dostepneMiasta) {
      // console.log(x);
      // console.log("21903821903");
      obj[`${x}`] = new FormControl(false);
    }

    this.searchForm = new FormGroup({
      spec: new FormControl('---', [Validators.required, Validators.pattern(/[^-]/g)]),
      cities: new FormGroup(obj),
      dataStart: new FormControl('2017-09-11', [Validators.required]),
      dataStop: new FormControl('2017-09-14', [Validators.required])
    });
  //     //do testow takie:
  //     spec: ['Ortopeda', [Validators.required, Validators.pattern(/[^-]/g)]],
  //     cities: ['null', [Validators.required]],
  //     dataStart: ['2017-08-27', [Validators.required]],
  //     dataStop: ['2017-08-29', [Validators.required]]
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
    // this.buildSearchForm();
    console.log(this.dostepneSpecjalizacje);
    console.log(this.dostepneMiasta);
  }

  szukajTerminu() {
    this.wolneTerminyTab = [];
    let wybranaSpecjalizacja = this.searchForm.get('spec').value;

    let wybraneMiasta = [];
    for (let miasto in this.searchForm.get('cities').value) {
      if (this.searchForm.get('cities').value[miasto] === true) {
        wybraneMiasta.push(miasto);
      }
    }
    // console.log("wybrane miasta:");
    // console.log(wybraneMiasta);
    // let wybraneMiasta = ["Opole", "Krakow", "Katowice"]; //spr, to na sztywno na razie, potem zmienic
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
    if (this.wolneTerminyTab.length === 0)
      alert("Brak wolnych terminow");
  }

  zapisNaWizyte(idTerminu: Number) {
    this.router.navigate(['pacjent/rejestracja', idTerminu]);
  }

  walidujMiasta() {
    this.miastaInvalid = true;
    // for (let i = 0; i < this.dostepneMiasta.length; i++) {
    //   let checkbox = document.getElementsByClassName("checkCity")[i];
    //   if (checkbox.checked === true)
    //     this.miastaInvalid = false;
    // } //spr, czemu powyzsze nie dziala?
    for (let x of this.dostepneMiasta) {
      if (this.searchForm.get('cities').get(`${x}`).value) //jesli ktorekolwiek miasto zaznaczone
        this.miastaInvalid = false; //to formularz mozna wyslac
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
    // this.utworzTabeleWolnychTerminowLekarzy();
    // this.zbudujWartosciFormularza();
    console.log(this.searchForm.value);
  }

  constructor(private pacjentService: PacjentService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.pobierzLekarzy();
    // this.pobierzTerminy(); //byl problem z koniecznoscia ctrl+F5
  }

  ngDoCheck() {
    this.walidujMiasta();
  }

}
