import { Component, OnInit } from '@angular/core';
import { DoktorService } from '../../doktor.service';
import { Doctor } from "../../admin/models/doctor";
import { TestowyService } from '../testowy.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'testowy',
  templateUrl: './testowy.component.html',
  styleUrls: ['./testowy.component.less'],
  // providers: [DoktorService] //nie trzeba, bo dodalem go do providers w module
  providers: [TestowyService]
})
export class TestowyComponent implements OnInit {
  zmienna = "jakis tekst";
  obiekt;
  // ==================== smieci wyzej ====================
  doctorsTab: Doctor[];
  doctorsTabSerwer: Doctor[];
  lista: string[] = ['Zenek', 'Adrian', 'Patryk', 'Filip', 'Damian'];
  getTime: string;
  getDataJSON: string;
  getDataObj = {};
  typSortowania: string = 'malejaco';
  doctorForm: FormGroup;

  zmienSortowanie(): void {
    console.log("wywolano metode zmienSortowanie()");
    if (this.typSortowania == 'malejaco')
      this.typSortowania = 'rosnaco';
    else 
      this.typSortowania = 'malejaco'
  }

  getDoctors(): void {
    this.doctorsTab = this.doktorService.getDoctors();
  }

  loadGetTime() {
    // this.getData = "dziala";
    this.testowyService.getTime().subscribe(
      dane => this.getTime = JSON.stringify(dane),
      error => console.log(error),
      () => console.log("Pobieranie danych zakonczone")
    )
  }

  loadGetData() {
    this.testowyService.getData().subscribe(
      (value) => { //typeof value = object, a dokladniej value to tablica z obiektami JSON z naszej bazy
        console.log("value type of = " + typeof value);
        console.log("value = ");
        console.log(value);
        console.log("this.getDataJSON type of = " + typeof this.getDataJSON);
        console.log("this.getDataJSON = ");
        console.log(this.getDataJSON);
        console.log("this.getDataObj type of = " + typeof this.getDataObj);
        console.log("this.getDataObj = ");
        console.log(this.getDataObj);
        this.getDataJSON = JSON.stringify(value);
        this.getDataObj = value;
      },
      error => console.log(error),
      () => console.log("Pobieranie danych zakonczone")
    )
  }

  zaladujDoktorow() {
    this.testowyService.pobierzDoktorowZSerwera().subscribe(
      value => {
        //value to tablica z obiektami
        this.doctorsTabSerwer = value;

        // console.log("==============================");

        console.log("value = ");
        console.log(value);
        // console.log("type of value = " + typeof value);

        // console.log("value.length = " + value.length);

        // for(let i=0; i< value.length; i++) {
        //   console.log(`value[${i}] = `);
        //   console.log(value[i]);
        //   console.log("**********");
        // }

        // value.forEach(element => {
        //   console.log(element);
        //   console.log("**********");
        // });
        
        // for(let x of value) {
        //   console.log(x);
        //   console.log("**********");
        // }

        // for(let x in value) {
        //   console.log(x);
        //   console.log("**********");
        // }

        // for(let x in value) {
        //   console.log(value[x]);
        //   console.log("**********");
        // }

        // console.log("==============================");
      },
      error => console.log(error),
      () => console.log("Pobieranie lekarzy z serwera zakonczone")
    )
  }

  wyslijDoktora() {
    //spr ponizsze kroki sa po to, aby uzytkownik mogl wpisac dane w postaci spec1,spec2,spec3 zamiast ["spec1", "spec2", "spec3"]
    let obj = this.doctorForm.value;
    let specsString: string = this.doctorForm.get('specs').value;
    let citiesString: string = this.doctorForm.get('cities').value;
    
    if (typeof specsString === "string") { //gdy nie losujemy danych wejsciowych formularza funkcja losuj() to wpisujemy je recznie w postaci spec1,spec2,spec3 czyli jest to string, musimy zrobic z tego tablice, jesli natomiast uzywamy funkcji losuj(), ona zwraca nam od razu gotowe dane w postaci tablicy, wiec nie musimy juz sie bawic
      console.log("specsString = ");
      console.log(specsString);
      console.log("typeof specsString = ");
      console.log(typeof specsString);

      let specsTab = specsString.split(',');
      obj['specs'] = specsTab;
      this.doctorForm.setValue(obj);
    }

    if (typeof citiesString === "string") { //gdy nie losujemy danych wejsciowych formularza funkcja losuj() to wpisujemy je recznie w postaci city1,city2,city3 czyli jest to string, musimy zrobic z tego tablice, jesli natomiast uzywamy funkcji losuj(), ona zwraca nam od razu gotowe dane w postaci tablicy, wiec nie musimy juz sie bawic
      console.log("citiesString = ");
      console.log(citiesString);
      console.log("typeof citiesString = ");
      console.log(typeof citiesString);

      let citiesTab = citiesString.split(','); //zamienia stringa na tab, przecinek wyznacza/oddziela elementy tablicy
      // console.log("citiesTab = ");
      // console.log(citiesTab);
      // console.log("typeof citiesTab = ");
      // console.log(typeof citiesTab);
      // console.log("Array.isArray(citiesTab) = ");
      // console.log(Array.isArray(citiesTab));

      obj['cities'] = citiesTab;
      // console.log("this.doctorForm.value = ");
      // console.log(this.doctorForm.value);
      // console.log("this.doctorForm.get('cities').value WCZESNIEJ = ");
      // console.log(this.doctorForm.get('cities').value);
      // console.log("this.doctorForm.get('cities').value TERAZ = ");
      // console.log(this.doctorForm.get('cities').value);
      // console.log("this.doctorForm.value = ");
      // console.log(this.doctorForm.value);
      this.doctorForm.setValue(obj);
    }

    // console.log("this.doctorForm = ");
    // console.log(this.doctorForm);
    // console.log("this.doctorForm.value = ");
    // console.log(this.doctorForm.value);
    // console.log("JSON.stringify(this.doctorForm.value) = ");
    // console.log(JSON.stringify(this.doctorForm.value));

    this.testowyService.wyslijDoktoraNaSerwer(this.doctorForm.value).subscribe(
      value => {
        console.log("ta funkcja jest wywolywana jesli metoda http zostanie poprawnie obsluzona");
        console.log("Dane wyslane poprawnie!");
        console.log("odpowiedz z serwera (value) zmapowana i json() = ");
        console.log(value);
        this.doctorForm.reset(); //resetowanie formularza po poprawnym wyslaniu doktora
        // this.zaladujDoktorow(); //po wyslaniu doktora do bazy odswiezamy liste doktorow
      },
      error => {
        this.g();
        // console.log(`error status = ${error['status']}`);
        console.log(error);
        this.g();

        // for (let x in error) {
        //   console.log(`${x} = ${error[x]}`);
        // }
      },
      () => console.log("Wysylanie lekarza do serwera zakonczone")
    );
  }

  usunDoktora(id: number) {
    console.log(`usuwasz lekarza o id = ${id}`);
    this.testowyService.usunDoktoraZSerwera(id).subscribe(
      value => {
        this.g()
        // console.log("value = ");
        // console.log(value)
        // console.log('value count = ');
        // console.log(value['count']);
        if (value['count'] == 1)
        {
          console.log(`Usunieto lekarza o id = ${id}\nIlosc usunietych lekarzy = ${value['count']}`);
          this.zaladujDoktorow(); //odwiezenie listy lekarzy
        }
        this.g()
      },
      error => {
        console.log(error);
      },
      () => console.log("Lekarz zostal usuniety, metoda http zostala przetworzona")
    );
  }

  g() {console.log("********************")};

  testFunc(lekarz: Doctor) {
    this.g();
    for (let x in lekarz) {
      console.log(`${x} = ${lekarz[x]}`);
    }
    this.g();
  }

  //funkcji mozna uzyc przy budowie formularza (wypelnianie danych wejsciowych w funkcji buildDoctorForm())
  losuj(par: string): string | string[] {
    let imiona = ["Adam", "Bartek", "Damian", "Grzegorz", "Marcin", "Tadeusz", "Wladyslaw", "Zygmunt"];
    let nazwiska = ["Admirczyk", "Bartczak", "Darlowski", "Grabarczyk", "Matkowski", "Tkaczyk", "Wawrzyniec", "Zamojski"];
    let specjalizacje = ["Alergolog", "Anestezjolog", "Chirurg", "Dermatolog", "Epidemiolog", "Ginekolog", "Kardiolog", "Neurolog", "Okulista", "Ortopeda", "Pediatra", "Psychiatra", "Weterynarz"];
    let miasta = ["Bydgoszcz", "Gdansk", "Katowice", "Kielce", "Krakow", "Lublin", "Lodz", "Olsztyn", "Opole", "Poznan", "Rzeszow", "Szczecin", "Troun", "Warszawa", "Wroclaw"];
    
    if (par == "name") {
      return imiona[Math.floor(Math.random() * imiona.length)];
    }

    if (par == "surname") {
      return nazwiska[Math.floor(Math.random() * nazwiska.length)];
    }

    if (par == "specs") {
      // Math.random() //losuje <0,1)
      let specs = [];
      let iloscSpecjalizacji = (Math.floor(Math.random() * 5) + 1); //losuje <1,5)
      do {
        let index = Math.floor(Math.random() * specjalizacje.length);
        if (specs.indexOf(specjalizacje[index]) !== -1) { //sprawdzam czy dana specjalizacja zostala juz wylosowana i dodana do tablicy
          console.log(`Specjalizacja ${specjalizacje[index]} jest juz w tablicy!`);
          continue;
        }
        specs.push(specjalizacje[index]);
      }
      while (
        specs.length < iloscSpecjalizacji
      )
      console.log(`Wylosowane specjalizacje: ${specs}`);
      return specs;
    }

    if (par == "cities") {
      // Math.random() //losuje <0,1)
      let cities = [];
      let iloscMiast = (Math.floor(Math.random() * 3) + 1); //losuje <1,3)
      do {
        let index = Math.floor(Math.random() * miasta.length);
        if (cities.indexOf(miasta[index]) !== -1) { //sprawdzam czy dane miasto zostalo juz wylosowane i dodane do tablicy
          console.log(`Miasto ${miasta[index]} jest juz w tablicy!`);
          continue;
        }
        cities.push(miasta[index]);
      }
      while (
        cities.length < iloscMiast
      )
      console.log(`Wylosowane miasta: ${cities}`);
      return cities;
    }

  }

  losujDane() {
    let imiona = ["Adam", "Bartek", "Damian", "Grzegorz", "Marcin", "Tadeusz", "Wladyslaw", "Zygmunt"];
    let nazwiska = ["Admirczyk", "Bartczak", "Darlowski", "Grabarczyk", "Matkowski", "Tkaczyk", "Wawrzyniec", "Zamojski"];
    let specjalizacje = ["Alergolog", "Anestezjolog", "Chirurg", "Dermatolog", "Epidemiolog", "Ginekolog", "Kardiolog", "Neurolog", "Okulista", "Ortopeda", "Pediatra", "Psychiatra", "Weterynarz"];
    let miasta = ["Bydgoszcz", "Gdansk", "Katowice", "Kielce", "Krakow", "Lublin", "Lodz", "Olsztyn", "Opole", "Poznan", "Rzeszow", "Szczecin", "Troun", "Warszawa", "Wroclaw"];
    
    let name: string = imiona[Math.floor(Math.random() * imiona.length)];
    let surname:string = nazwiska[Math.floor(Math.random() * nazwiska.length)];
    let specs: string[] = [];
    let cities: string[] = [];

    let obj = this.doctorForm.value; //spr dodac typ?

    // Math.random() //losuje <0,1)
    let iloscSpecjalizacji = (Math.floor(Math.random() * 5) + 1); //losuje <1,5)
    do {
      let index = Math.floor(Math.random() * specjalizacje.length);
      if (specs.indexOf(specjalizacje[index]) !== -1) { //sprawdzam czy dana specjalizacja zostala juz wylosowana i dodana do tablicy
        console.log(`Specjalizacja ${specjalizacje[index]} jest juz w tablicy!`);
        continue;
      }
      specs.push(specjalizacje[index]);
    }
    while (
      specs.length < iloscSpecjalizacji
    )
    console.log(`Wylosowane specjalizacje: ${specs}`);

    // Math.random() //losuje <0,1)
    let iloscMiast = (Math.floor(Math.random() * 3) + 1); //losuje <1,3)
    do {
      let index = Math.floor(Math.random() * miasta.length);
      if (cities.indexOf(miasta[index]) !== -1) { //sprawdzam czy dane miasto zostalo juz wylosowane i dodane do tablicy
        console.log(`Miasto ${miasta[index]} jest juz w tablicy!`);
        continue;
      }
      cities.push(miasta[index]);
    }
    while (
      cities.length < iloscMiast
    )
    console.log(`Wylosowane miasta: ${cities}`);
    
    // console.log("obj = ");
    // console.log(obj);
    obj['name'] = name;
    obj['surname'] = surname;
    obj['specs'] = specs;
    obj['cities'] = cities;
    this.doctorForm.setValue(obj);
    // console.log("obj = ");
    // console.log(obj);
  }

  goToDoktorDetails(lekarz: Doctor) {
    // console.log(lekarz.id);
    this.router.navigate(['test', lekarz.id]);
  }

  buildDoctorForm() {
    return this.formBuilder.group({
      // name: [this.losuj("name"), [Validators.required]], //losowanie danych wejsciowych funkcja losuj()
      name: ['', [Validators.required]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      specs: ['', [Validators.required]],
      cities: ['', [Validators.required]],
    });
  }

  pokazGrafik(lekarz: Doctor) {
    this.router.navigate(['test/grafik', lekarz.id]);
  }

  constructor(private doktorService: DoktorService, 
              private testowyService: TestowyService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.zaladujDoktorow();
    this.getDoctors();
    this.doctorForm = this.buildDoctorForm();
  }

}
