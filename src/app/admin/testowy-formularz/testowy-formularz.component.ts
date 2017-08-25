import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Doctor } from "app/admin/models/doctor";
import { Termin } from "app/admin/models/termin";

@Component({
  selector: 'testowy-formularz',
  templateUrl: './testowy-formularz.component.html',
  styleUrls: ['./testowy-formularz.component.less']
})
export class TestowyFormularzComponent implements OnInit {

  terminForm: FormGroup;
  lekarz: Doctor;
  terminyTab: Termin[] = [];

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

    let idLekarza = Math.floor(Math.random() * 20);

    obj['data'] = data;
    obj['start'] = start;
    obj['stop'] = stop;
    obj['wolny'] = wolny;
    obj['idLekarza'] = idLekarza;

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.tabInit();
    this.terminForm = this.buildTerminForm();
  }

}
