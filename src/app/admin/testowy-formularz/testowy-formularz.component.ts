import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Doctor } from "app/admin/models/doctor";
import { Termin } from "app/admin/models/termin";
import { ActivatedRoute } from "@angular/router";
import { TestowyService } from "app/admin/testowy.service";

@Component({
  selector: 'testowy-formularz',
  templateUrl: './testowy-formularz.component.html',
  styleUrls: ['./testowy-formularz.component.less'],
  providers: [TestowyService]
})
export class TestowyFormularzComponent implements OnInit {

  terminForm: FormGroup;
  lekarz: Doctor;
  terminyTab: Termin[] = [];
  terminyTabSerwer: Termin[] = [];
  idLekarzaURL = +this.route.snapshot.params['id'];

  tabInit() {
    this.terminyTab[0] = {
      data: "2017-08-25",
      start: "08:30",
      stop: "16:30",
      wolny: true,
      pacjent: '',
      powod: '',
      idLekarza: 5,
      id: 1
    };

    this.terminyTab[1] = {
      data: "2017-08-26",
      start: "10:30",
      stop: "12:30",
      wolny: false,
      pacjent: 'Grzegorz Nowak',
      powod: 'Ból zęba',
      idLekarza: 10,
      id: 2
    }
  }

  losujDane() {
    this.terminForm.reset();
    let obj = this.terminForm.value;

    let temp = Math.ceil(Math.random() * 30);
    let dzien = temp.toString();
    if (temp.toString().length == 1)
      dzien = `0${temp}`;

    temp = Math.ceil(Math.random() * 12);
    let miesiac = temp.toString();
    if (temp.toString().length == 1)
      miesiac = `0${temp}`;

    let data = `2017-${miesiac}-${dzien}`;

    let startGodz = Math.floor(Math.random() * 18);
    let start = `${startGodz}:00`;
    if (start.length == 4)
      start = `0${start}`;

    let stopGodz;
    do {
      stopGodz = Math.floor(Math.random() * 18);
    }
    while (startGodz > stopGodz);
    let stop = `${stopGodz}:30`;
    if (stop.length == 4)
      stop = `0${stop}`;

    let wolny = Math.round(Math.random()) % 2 == 0 ? true : false;

    if (wolny == false) {
      let imiona = ["Anna", "Barbara", "Felicja", "Maja", "Olga", "Patrycja", "Sylwia"];
      let nazwiska = ["Barycka", "Domagała", "Grabarczyk", "Kaminska", "Tkacka", "Włodarczyk"];
      let urazy = ["Ból zęba", "Ból głowy", "Złamana noga", "Grypa", "Ospa"];

      let imie = imiona[Math.floor(Math.random() * imiona.length)];
      let nazwisko = nazwiska[Math.floor(Math.random() * nazwiska.length)];
      let uraz = urazy[Math.floor(Math.random() * urazy.length)];

      let pacjent = `${imie} ${nazwisko}`;
      let powod = uraz;

      obj['pacjent'] = pacjent;
      obj['powod'] = powod;
    }

    // let idLekarza = Math.floor(Math.random() * 20);

    obj['data'] = data;
    obj['start'] = start;
    obj['stop'] = stop;
    obj['wolny'] = wolny;
    obj['idLekarza'] = this.idLekarzaURL;

    this.terminForm.setValue(obj);
  }

  buildTerminForm() {
    return this.formBuilder.group({
      data: ['', [Validators.required]],
      start: ['', [Validators.required]],
      stop: ['', [Validators.required]],
      wolny: [true, [Validators.required]],
      pacjent: [''],
      powod: [''],
      idLekarza: ['', [Validators.required]]
    });
  }

  dodajTermin() {
    let obj = this.terminForm.value;
    
    let idLekarza = parseInt(this.terminForm.get('idLekarza').value);
    obj['idLekarza'] = idLekarza;

    this.terminForm.setValue(obj);

    this.terminyTab.push(this.terminForm.value);

    // console.log("this.terminForm.value = ");
    // console.log(this.terminForm.value);
    // console.log("typeof this.terminForm.value = ");
    // console.log(typeof(this.terminForm.value));
    // console.log("**********");

    // console.log("this.terminForm.get('data').value = ");
    // console.log(this.terminForm.get('data').value);
    // console.log("typeof this.terminForm.get('data').value = ");
    // console.log(typeof(this.terminForm.get('data').value));
    // console.log("**********");
    
    // console.log("this.terminForm.get('start').value = ");
    // console.log(this.terminForm.get('start').value);
    // console.log("typeof this.terminForm.get('start').value = ");
    // console.log(typeof(this.terminForm.get('start').value));
    // console.log("**********");
    
    // console.log("this.terminForm.get('stop').value = ");
    // console.log(this.terminForm.get('stop').value);
    // console.log("typeof this.terminForm.get('stop').value = ");
    // console.log(typeof(this.terminForm.get('stop').value));
    // console.log("**********");
    
    // console.log("this.terminForm.get('wolny').value = ");
    // console.log(this.terminForm.get('wolny').value);
    // console.log("typeof this.terminForm.get('wolny').value = ");
    // console.log(typeof(this.terminForm.get('wolny').value));
    // console.log("**********");
    
    // console.log("this.terminForm.get('pacjent').value = ");
    // console.log(this.terminForm.get('pacjent').value);
    // console.log("typeof this.terminForm.get('pacjent').value = ");
    // console.log(typeof(this.terminForm.get('pacjent').value));
    // console.log("**********");
    
    // console.log("this.terminForm.get('powod').value = ");
    // console.log(this.terminForm.get('powod').value);
    // console.log("typeof this.terminForm.get('powod').value = ");
    // console.log(typeof(this.terminForm.get('powod').value));
    // console.log("**********");
    
    // console.log("this.terminForm.get('idLekarza').value = ");
    // console.log(this.terminForm.get('idLekarza').value);
    // console.log("typeof this.terminForm.get('idLekarza').value = ");
    // console.log(typeof(this.terminForm.get('idLekarza').value));
    // console.log("**********");

    // console.log("this.terminForm.get('id').value = ");
    // console.log(this.terminForm.get('id').value);
    // console.log("typeof this.terminForm.get('id').value = ");
    // console.log(typeof(this.terminForm.get('id').value));
    // console.log("**********");
  }

  pobierzTerminy() {
    const id = +this.route.snapshot.params['id'];
    this.testowyService.pobierzTerminyDoktoraZSerwera(id).subscribe(
      value => {
        this.terminyTabSerwer = value;
        console.log("value = ");
        console.log(value);
      },
      error => console.log(error),
      () => console.log(`Pobieranie terminow lekarza o id ${id} z serwera zakonczone`)
    )
  }

  wyslijTermin() {
    if (this.terminForm.get('wolny').value === true) {
      let obj = this.terminForm.value;
      obj['pacjent'] = null;
      obj['powod'] = null;
      this.terminForm.setValue(obj);
    }

    this.testowyService.wyslijTerminNaSerwer(this.terminForm.value).subscribe(
      value => {
        console.log("ta funkcja jest wywolywana jesli metoda http zostanie poprawnie obsluzona");
        console.log("Dane wyslane poprawnie!");
        console.log("odpowiedz z serwera (value) zmapowana i json() = ");
        console.log(value);
        this.terminForm.reset(); //resetowanie formularza po poprawnym wyslaniu terminu
        this.pobierzTerminy(); //po wyslaniu doktora do bazy odswiezamy liste doktorow
      },
      error => {
        console.log(error);
      },
      () => console.log("Wysylanie terminu do serwera zakonczone")
    )
  }

  usunTermin(id: Number) {
    return this.testowyService.usunTerminZSerwera(id).subscribe(
      value => {
        if (value['count'] == 1)
        {
          console.log(`Usunieto termin o id = ${id}\nIlosc usunietych terminow = ${value['count']}`);
          this.pobierzTerminy(); //odwiezenie listy terminow
        }
      },
      error => {
        console.log(error);
      },
      () => console.log("Termin zostal usuniety, metoda http zostala przetworzona")
    )
  }

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private testowyService: TestowyService) { }

  ngOnInit() {
    // this.tabInit();
    this.pobierzTerminy();
    this.terminForm = this.buildTerminForm();
  }

}
