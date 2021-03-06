import { Component, OnInit } from '@angular/core';
import { TestowyService } from "app/admin/testowy.service";
import { ActivatedRoute, Router } from "@angular/router"; //dzieki temu serwisowi mozemy dostac sie do sciezki na ktorej jestesmy obecnie
import { Termin } from "app/admin/models/termin";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Doctor } from "app/admin/models/doctor";

@Component({
  selector: 'testowy-termin-details',
  templateUrl: './testowy-termin-details.component.html',
  styleUrls: ['./testowy-termin-details.component.less'],
  providers: [TestowyService]
})
export class TestowyTerminDetailsComponent implements OnInit {

  termin: Termin;
  terminForm: FormGroup;
  dostepneMiasta: String[] = [];
  daneLekarza: Doctor;

  buildTerminForm() {
    return this.formBuilder.group({
      // miasto: ['', [Validators.required, Validators.pattern(/[^-]/g)]], //mialem to poczatkowo, ale pozniej zmienilem [selected]="miasto === termin.miasto" w templatce i od razu zaznacza to miasto, ktore potrzeba, wiec ta linijka jest zbedna, bo usunalem --- z this.dostepneMiasta
      miasto: ['', [Validators.required]],
      data: ['', [Validators.required]],
      start: ['', [Validators.required]],
      stop: ['', [Validators.required]],
      wolny: [true, [Validators.required]],
      pacjent: [''],
      powod: [''],
      idLekarza: ['', [Validators.required]]
    });
  }

  ladujTermin() {
    // let id = parseInt(this.route.snapshot.params['id']); //pobieramy obecne id ze sciezki na ktorej jestesmy
    const id = +this.route.snapshot.params['id']; //pobieramy obecne id ze sciezki na ktorej jestesmy
    // console.log("snapshot.params: ");
    // console.log(this.route.snapshot.params); //to obiekt z kluczem id o wartosci jakiejs tam
    this.testowyService.pobierzTerminZSerwera(id).subscribe(
      value => {
        this.termin = value;
        this.pobierzDaneLekarza(); // dopisane
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("pobieranie terminu zakonczone");
      }
    );
  }

  zaktualizujTermin() {
      this.testowyService.zaktualizujTerminNaSerwerze(this.termin.id, this.terminForm.value).subscribe(
        value => {
        console.log("ta funkcja jest wywolywana jesli metoda http zostanie poprawnie obsluzona");
        console.log("Dane terminu zostaly zaktualizowane!");
        console.log("odpowiedz z serwera (value) zmapowana i json() = ");
        console.log(value);
        this.terminForm.reset(); //resetowanie formularza po poprawnym wyslaniu doktora
        // this.zaladujDoktorow(); //po wyslaniu doktora do bazy odswiezamy liste doktorow
      },
      error => {
        // console.log(`error status = ${error['status']}`);
        console.log(error);

        // for (let x in error) {
        //   console.log(`${x} = ${error[x]}`);
        // }
      },
      () => console.log("Wysylanie terminu do serwera zakonczone")
      )

      this.router.navigate([`test/formularz/${this.termin.idLekarza}`]);
  }

  pobierzDaneLekarza() {
    const id = this.termin.idLekarza;
    this.testowyService.pobierzDoktoraZSerwera(id).subscribe(
      value => {
        this.daneLekarza = value;
        console.log("value = ");
        console.log(value);
        this.pobierzDaneDoFormularza();
      },
      error => console.log(error),
      () => console.log(`Pobieranie danych lekarza o id ${id} z serwera zakonczone`)
    )
  }

  pobierzDaneDoFormularza() {
    for (let miasto of this.daneLekarza.cities) {
        if (this.dostepneMiasta.indexOf(miasto) === -1) {
          this.dostepneMiasta.push(miasto);
        }
      }
      this.zaladujFormularz();
  }

  zaladujFormularz() {
    console.log("this.termin = ");
    console.log(this.termin);
    for(let x in this.termin) {
      console.log(`termin[${x}] = ${this.termin[x]}`);
    }
    let obj = this.terminForm.value;

    obj['data'] = this.termin.data;
    obj['start'] = this.termin.start;
    obj['stop'] = this.termin.stop;
    obj['wolny'] = this.termin.wolny;
    obj['pacjent'] = this.termin.pacjent;
    obj['powod'] = this.termin.powod;
    obj['idLekarza'] = this.termin.idLekarza;
    obj['miasto'] = this.termin.miasto;
    console.log("Jestem tutaj");
    console.log(this.termin.miasto);
    this.terminForm.setValue(obj);
  }

  constructor(private formBuilder: FormBuilder,
              private testowyService: TestowyService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.ladujTermin();
    // this.pobierzDaneLekarza();
    this.terminForm = this.buildTerminForm();
  }

}
